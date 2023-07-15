<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Todo;
use App\Http\Resources\TaskResource;
use Illuminate\Support\Facades\Auth;

class TodoController extends Controller
{
    //for get all tasks
    public function index()
    {

        $todoTasks = Todo::withTrashed()->get();

        return TaskResource::collection($todoTasks);
    }

    //for get task by id
    public function getTaskById($id)
    {

        $task = Todo::find($id);

        if (!$task) {
            return response()->json(['message' => 'Task not found'], 404);
        }

        return new TaskResource($task);
    }

    //for create new task
    public function store(Request $request)
    {

        // Validate the request data
        $validatedTaskData = $request->validate([
            'title' => 'required|string',
            'description' => 'nullable|string',
            'userid' =>'required'
        ]);

        //store new data in database
        $task = Todo::create($validatedTaskData);

        // Return the new task as a response
        return new TaskResource($task);
    }

    //for update exiting task
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

    //for softdelete task
    public function destroy(Todo $task)
        {
            $task->delete();

            return response()->json([
                'message' => 'Soft delete successful'
            ], 200);
        }

    //for restore deleted task
    public function restore($id)
        {
            $task = Todo::withTrashed()->findOrFail($id);
            $task->restore();

            return response()->json([
                'message' => 'Restored successfully'
            ], 200);
        }

}
