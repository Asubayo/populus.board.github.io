<?php
class Model
{
	public $string;

	public function __construct(){
		$this->string = "MVC + PHP = Awesome, click here!";
	}

}


class View
{
	private $model;
	private $controller;

	public function __construct($controller,$model) {
		$this->controller = $controller;
		$this->model = $model;
	}

	public function output() {
		return "<p><a href=\"testMVC.php?action=clicked\">" . $this->model->string . "</a></p>";
	}
	
	public function outputOld(){
		return "<p>" . $this->model->string . "</p>";
	}
}

class Controller
	{
	private $model;

	public function __construct($model){
		$this->model = $model;
	}

	public function clicked() {
		$this->model->string = "Updated Data, thanks to MVC and PHP!";
	}
}

$model = new Model();
$controller = new Controller($model);
$view = new View($controller, $model);

if (isset($_GET['action']) && !empty($_GET['action'])) {
	$controller->{$_GET['action']}();
}

echo $view->output();
?>