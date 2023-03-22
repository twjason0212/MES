<?php

class Controller {
    public function model($model) {
        require_once "models/$model.php";
        return new $model();
    }

    public function view($view, $data = array()) {
        require "views/$view.php";
    }
}
