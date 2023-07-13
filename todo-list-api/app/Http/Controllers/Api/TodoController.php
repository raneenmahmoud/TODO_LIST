<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Todo;

class TodoController extends Controller
{
    public function index()
    {
        $todoTasks = Todo::all();
        return $todoTasks;
    }

    public function store(request $request){

        $title = request()->title;
        $description = request()->description;
        //store variables data in database
        $post = Todo::create([
            'title' => request()->title,
            'description' => request()->description
        ]);
        return $post;
    }
}
