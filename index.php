<?php
class Model
{
    private $bdd;
    private $log;

	public function __construct()
    {
		
	}

    public function connectBDD()
    {
        $this->bdd = mysqli_connect("localhost", "root", "", "populus");
        $this->log = '';

        // Check connection
        if($this->bdd === false){
            die("ERROR: Could not connect. " . mysqli_connect_error());
            return false;
        }

        return true;
    }

    public function disconnectBDD()
    {
        mysqli_close($this->bdd);
    }

    public function getLogs()
    {
        return $this->log;
    }

    public function getPoplarMeasurementHtmlTable($id)
    {
        $sql = "SELECT * FROM populus.measurements WHERE TREE_ID=" .strval($id) ." ORDER BY DATE ASC"; 
        $res = mysqli_query($this->bdd, $sql);
        $table = '';

        if($res = mysqli_query($this->bdd, $sql))
        {
            if(mysqli_num_rows($res) > 0)
            {
                $table .= "<table  width = \"100%\">";
                    $table .= "<tr  style=\"background-color: #009879;\">";
                        $table .= "<th>Date</th>";
                        $table .= "<th>Measurements</th>";
                    $table .= "</tr>";

                while($row = mysqli_fetch_array($res))
                {
                    $table .= "<tr>";
                        $table .= "<td style=\"text-align: center; vertical-align: middle;\">" . $row['DATE'] . "</td>";
                        $table .= "<td style=\"text-align: center; vertical-align: middle;\">" . $row['MEASUREMENT'] . "</td>";
                    $table .= "</tr>";
                }
                $table .= "</table>";

                // Free result set
                mysqli_free_result($res);
                return $table;
            } 
            else
            {
                $this->log .= "No records matching your query were found.";
            }
        } 
        else
        {
            $this->log .= "ERROR: Could not able to execute $sql. " . mysqli_error($bdd);
        }
    }

    public function getPoplarMeasurementArray($id)
    {
        $sql = "SELECT * FROM populus.measurements WHERE TREE_ID=" .strval($id) ." ORDER BY DATE ASC"; 
        $res = mysqli_query($this->bdd, $sql);
        $arr = array();

        if($res = mysqli_query($this->bdd, $sql))
        {
            if(mysqli_num_rows($res) > 0)
            {
                while($row = mysqli_fetch_array($res))
                {
                    $measureInfo = array();
                    array_push($measureInfo, $row['DATE'], $row['MEASUREMENT']);
                    array_push($arr, $measureInfo);
                }

                // Free result set
                mysqli_free_result($res);
                return $arr;
            } 
            else
            {
                $this->log .= "No records matching your query were found.";
            }
        } 
        else
        {
            $this->log .= "ERROR: Could not able to execute $sql. " . mysqli_error($this->bdd);
        }
    }

    public function getPoplarNoteHtmlTable($id)
    {
        $sql = "SELECT * FROM populus.notes WHERE POPULUS_ID=" .strval($id) ." ORDER BY Date ASC"; 
        $res = mysqli_query($this->bdd, $sql);
        $table = '';

        if($res = mysqli_query($this->bdd, $sql))
        {
            if(mysqli_num_rows($res) > 0)
            {
                $table .= "<table width = \"100%\">";
                    $table .= "<tr  style=\"background-color: #009879;\">";
                        $table .= "<th>Date</th>";
                        $table .= "<th>Comment</th>";
                    $table .= "</tr>";

                while($row = mysqli_fetch_array($res))
                {
                    $table .= "<tr>";
                        $table .= "<td style=\"width: 20%; text-align: center; vertical-align: middle;\">" . $row['Date'] . "</td>";
                        $table .= "<td width = \"80%\">" . $row['Comment'] . "</td>";
                    $table .= "</tr>";
                }
                $table .= "</table>";

                // Free result set
                mysqli_free_result($res);
                return $table;
            }
        }
    }

    public function getPoplarInfoHtmlTable($id)
    {
        $sql = "SELECT * FROM arbres WHERE ID=" .strval($id);
        $res = mysqli_query($this->bdd, $sql);
        $table = '';

        if($res = mysqli_query($this->bdd, $sql))
        {
            if(mysqli_num_rows($res) > 0)
            {
                $table .= "<table width = \"100%\">";
                    $table .= "<tr style=\"background-color: #009879;\">";
                        $table .= "<th>Id</th>";
                        $table .= "<th>Variety</th>";
                        $table .= "<th>Planting Date</th>";
                        $table .= "<th>Marked</th>";
                        $table .= "<th>IsDead</th>";
                    $table .= "</tr>";

                while($row = mysqli_fetch_array($res))
                {
                    $table .= "<tr>";
                        $table .= "<td width = \"10%\">" . $row['ID'] . "</td>";
                        $table .= "<td width = \"35%\">" . $row['Variety'] . "</td>";
                        $table .= "<td width = \"35%\">" . $row['Planting Date'] . "</td>";
                        $table .= "<td width = \"10%\">" . $row['Marked'] . "</td>";
                        $table .= "<td width = \"10%\">" . $row['IsDead'] . "</td>";
                    $table .= "</tr>";
                }
                $table .= "</table>";

                // Free result set
                mysqli_free_result($res);
                return $table;

            } 
            else
            {
                $this->log .= "No records matching your query were found.";
            }
        } 
        else
        {
            $this->log .= "ERROR: Could not able to execute $sql. " . mysqli_error($this->bdd);
        }
    }

    public function getPoplarLastMeasurements()
    {
        $treeArray = array();
	    $measurementArray = array();

        $sql = "select t.TREE_ID, t.DATE, t.MEASUREMENT
                from populus.measurements t
                inner join (select TREE_ID, max(DATE) as max_date
                            from populus.measurements
                            group by TREE_ID) t2
                on t.TREE_ID = t2.TREE_ID and t.DATE = t2.max_date ORDER BY t.TREE_ID";

        $result = mysqli_query($this->bdd, $sql);
        
        if($result = mysqli_query($this->bdd, $sql))
        {
            if(mysqli_num_rows($result) > 0)
            {
                while($row = mysqli_fetch_array($result)){
                    array_push($treeArray, $row['TREE_ID']);
                    array_push($measurementArray, $row['MEASUREMENT']);
                }

                mysqli_free_result($result);
            }
        } 

        return array("trees"=>$treeArray, "measurements"=>$measurementArray);
    }

    public function getDeadPoplars()
    {
        $poplars = array();
        $sql = "SELECT * FROM arbres WHERE IsDead = TRUE";

        $result = mysqli_query($this->bdd, $sql);
        
        if($result = mysqli_query($this->bdd, $sql))
        {
            if(mysqli_num_rows($result) > 0)
            {
                while($row = mysqli_fetch_array($result))
                {
                    array_push($poplars, $row['ID']);
                }

                // Free result set
                mysqli_free_result($result);
            }
        } 

        return $poplars;
    }

    public function getMarkedPoplars()
    {
        $poplars = array();
        $sql = "SELECT * FROM arbres WHERE Marked = TRUE";

        $result = mysqli_query($this->bdd, $sql);
        
        if($result = mysqli_query($this->bdd, $sql))
        {
            if(mysqli_num_rows($result) > 0)
            {
                while($row = mysqli_fetch_array($result))
                {
                    array_push($poplars, $row['ID']);
                }

                // Free result set
                mysqli_free_result($result);
            }
        } 

        return $poplars;
    }

    public function getMaturePoplars()
    {
        $matureThresholdInCentimeters = 140;

        $poplars = array();
        $sql = "SELECT * FROM measurements WHERE MEASUREMENT>" .strval($matureThresholdInCentimeters);

        $result = mysqli_query($this->bdd, $sql);
        
        if($result = mysqli_query($this->bdd, $sql))
        {
            if(mysqli_num_rows($result) > 0)
            {
                while($row = mysqli_fetch_array($result))
                {
                    array_push($poplars, $row['TREE_ID']);
                }

                // Free result set
                mysqli_free_result($result);
            }
        } 

        return $poplars;
    }
}

class ModelFondreau
{
	public $text;

	public function __construct(){
		$this->text = "MVC + PHP = Awesome, click here!";
	}

}

class View {

    private $model;

    private $route;

	private $file;

	private $title;

    public function __construct($route, Model $model) {

        $this->route = $route;

        $this->model = $model;

		$this->file = "view/view_" . $route . ".php";
    }

	private function generateFile($file, $data = null) {
		if (file_exists($file)) {

			if(!is_null($data)) {
				extract($data);
			}
			
			ob_start();

			require $file;

			return ob_get_clean();
		}
		else {
			throw new Exception("The file '$file' couldn't be found.");
		}
	}
	
    public function output() {
		$content = $this->generateFile($this->file);

		$view = $this->generateFile('view/template.php',
			array('title' => $this->title, 'content' => $content));

		echo $view;
    }
}

class FrontController {

    public $controller;

    private $view;

    public function __construct(Router $router, $routeName, $action = null) {

        //echo $routeName;

        //Fetch a route based on a name, e.g. "search" or "list" or "edit"

        $route = $router->getRoute($routeName);


        //Fetch the names of each component from the router

        $modelName = $route->model;

        $controllerName = $route->controller;

        $viewName = $route->view;


        //Instantiate each component

        $model = new $modelName;

        $this->controller = new $controllerName($model);

        $this->view = new View($viewName, $model);

        //Run the controller action

       // if (!empty($action)) $this->controller->{$action}();

    }

    public function output() {
        $this->view->output();
    }
}

class Router {

    private $table = array();

    public function __construct() {

        //Here, class names are used rather than instances so instances are only ever created when needed, otherwise every model, view and
        //controller in the system would be instantiated on every request, which obviously isn't good!

		$this->table['home'] = new Route('Model', 'home', 'Controller');

		$this->table['fondreau'] = new Route('Model', 'fondreau', 'ControllerFondreau');

		$this->table['fondreauDorskamp'] = new Route('Model', 'fondreau_dorskamp', 'ControllerDorskamp');

		$this->table['fondreauDano'] = new Route('ModelFondreauDano', 'fondreau_dano', 'ControllerDano');

		$this->table['fondreauBanchereau'] = new Route('ModelFondreauBancherau', 'fondreau_banchereau', 'ControllerBanchereau');

		$this->table['simonniere'] = new Route('Model', 'simonniere', 'Controller');

		$this->table['simonniereBase'] = new Route('ModelSimonniereBase', 'simonniere_base', 'ControllerSimonniereBase');

		$this->table['simonnierePond'] = new Route('Model', 'simonniere_pond', 'ControllerSimonnierePond');

    }

    public function getRoute($route) {

        //$route = strtolower($route);

        return $this->table[$route];
    }
}

class Route {

    public $model;

    public $view;

    public $controller;

    public function __construct($model, $view, $controller) {

        $this->model = $model;

        $this->view = $view;

        $this->controller = $controller;
    }
}

class Controller {

    private $model;



    public function __construct(Model $model) {

        $this->model = $model;

    }



    public function textClicked() {

        $this->model->text = 'Text Updated';

    }
    public function poplarInfos()
    {
        echo json_encode("");
    }
}

class ControllerSimonnierePond {

    private $model;



    public function __construct(Model $model) {

        $this->model = $model;

    }



    public function textClicked() {

        $this->model->text = 'Text Updated';

    }

}

class ControllerFondreau {

    private $model;



    public function __construct(Model $model) {

        $this->model = $model;

    }



    public function textClicked() {

        $this->model->text = 'Text Updated';

    }

}

class ControllerDorskamp {

    private $model;

    public function __construct(Model $model) {

        $this->model = $model;

    }

    public function textClicked() {

        $this->model->text = 'Text Updated';

    }

    public function poplarInfos($id)
    {
        if(!$this->model->connectBDD())
            echo json_encode("");

        $measurements = $this->model->getPoplarMeasurementArray($id);
        $infoHtmlTable = $this->model->getPoplarInfoHtmlTable($id);
        $measurementHtmlTable = $this->model->getPoplarMeasurementHtmlTable($id);
        $noteHtmlTable = $this->model->getPoplarNoteHtmlTable($id);
        $logs = $this->model->getLogs();

        echo json_encode(array( 
            "measurements"=>$measurements,
            'infoHtmlTable'=>$infoHtmlTable,
            "measurementHtmlTable"=>$measurementHtmlTable,
            "noteHtmlTable"=>$noteHtmlTable,
            "logs"=>$logs
        ));

        $this->model->disconnectBDD();
    }

    public function allPoplarLastMeasurementArray()
    {
        if(!$this->model->connectBDD())
            echo json_encode("");

        $arr = $this->model->getPoplarLastMeasurements();
        $logs = $this->model->getLogs();

        $this->model->disconnectBDD();

        echo json_encode(
            array( 
                "trees"=>$arr["trees"], 
                "measurements"=>$arr["measurements"], 
                "logs"=>$logs
            )
        );
    }

    public function deadPoplars()
    {
        if(!$this->model->connectBDD())
            echo json_encode("");

        $res = $this->model->getDeadPoplars();
        $logs = $this->model->getLogs();

        $this->model->disconnectBDD();

        echo json_encode(
            array( 
                "poplars"=>$res, 
                "logs"=>$logs
            )
        );
    }

    public function markedPoplars()
    {
        if(!$this->model->connectBDD())
            echo json_encode("");

        $res = $this->model->getMarkedPoplars();
        $logs = $this->model->getLogs();

        $this->model->disconnectBDD();

        echo json_encode(
            array( 
                "poplars"=>$res, 
                "logs"=>$logs
            )
        );
    }

    public function maturePoplars()
    {
        if(!$this->model->connectBDD())
            echo json_encode("");

        $res = $this->model->getMaturePoplars();
        $logs = $this->model->getLogs();

        $this->model->disconnectBDD();

        echo json_encode(
            array( 
                "poplars"=>$res, 
                "logs"=>$logs
            )
        );
    }
}

if(!empty($_POST['route']) && !empty($_POST['action']))
{
    $frontController = new FrontController(
        new Router, $_POST['route'], $_POST['action']);

    $poplaId = $_POST['poplar_id'];
    if($poplaId  == null)
    {
        $frontController->controller->{$_POST['action']}();
    }
    else
    {
        $frontController->controller->{$_POST['action']}($poplaId);
    }
    
}
else
{
    $frontController = new FrontController(
        new Router, 
        isset($_GET['route']) ? $_GET['route'] : "home", 
        isset($_GET['action']) ? $_GET['action'] : null);
    
    $frontController->output();
}
