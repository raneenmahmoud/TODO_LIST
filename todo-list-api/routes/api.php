<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\TodoController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//endpoints
Route::get('tasks', [TodoController::class, 'index']);
Route::post('tasks', [TodoController::class, 'store']);
Route::put('/tasks/{task}', [TodoController::class, 'update']);
Route::delete('/tasks/{task}', [TodoController::class, 'destroy']);
Route::get('tasks/restore/{task}', [TodoController::class, 'restore']);
