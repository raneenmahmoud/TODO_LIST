<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Todo;
use App\Http\Resources\TaskResource;

class TodoController extends Controller
{
    public function index()
    {
        $todoTasks = Todo::all(); //select * from todos

        //to determin the specified columns of each task
        return TaskResource::collection($todoTasks);
    }

    public function store(Request $request){

        // Validate the request data
        $validatedTaskData = $request->validate([
            'title' => 'required|string',
            'description' => 'nullable|string',
        ]);

        //store new data in database
        $task = Todo::create($validatedTaskData);

        // Return the new task as a response
        return new TaskResource($task);
    }

    public function update(Request $request, Todo $task)
    {
        // Validate the request data
        $validatedTaskData = $request->validate([
            'title' => 'required|string',
            'description' => 'nullable|string',
        ]);

        // Update the attributes of the $task model
        $task->update($validatedTaskData);

        // Return the updated task as a response
        return new TaskResource($task);
    }

    public function destroy(Todo $task)
    {
        $task->delete();

        return response()->json([
            'message' => 'Delete successful'
        ], 200);
    }
}
