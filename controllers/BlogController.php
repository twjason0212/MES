<?php

class BlogController extends Controller {

    function index() {
        echo "home page of HomeController";
    }

    function list($num) {
        $blog = $this->model("Blog");
        $blog->num = $num;
        echo "list num : $blog->num";
    }
}
