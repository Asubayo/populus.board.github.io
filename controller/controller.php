<?php


class Controller
{
	private $model;

	public function __construct($model){
		$this->model = $model;
	}

	public function clicked() {
		$this->model->string = "Updated Data, thanks to MVC and PHP!";
	}
    
    public function showHome()
    {
        //$posts = getPosts();

        //require_once('../view/homeView.php');
    }

    public function showFondreauMain()
    {
        //$post = getPost($_GET['id']);
        //$comments = getComments($_GET['id']);

       // require('../view/fondreauMainView.php');
    }

    public function showSimonniereMain()
    {
        //$post = getPost($_GET['id']);
        //$comments = getComments($_GET['id']);

       // require('../view/simonniereMainView.php');
    }
}

