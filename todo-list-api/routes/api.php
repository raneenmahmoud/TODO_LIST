<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\TodoController;
use App\Http\Controllers\AuthController;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
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

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//endpoints
Route::middleware('auth:sanctum')->group(function () {
Route::get('tasks', [TodoController::class, 'index']);
Route::post('tasks', [TodoController::class, 'store']);
Route::get('/tasks/{task}', [TodoController::class, 'getTaskById']);
Route::put('/tasks/{task}', [TodoController::class, 'update']);
Route::delete('/tasks/{task}', [TodoController::class, 'destroy']);
Route::get('tasks/restore/{task}', [TodoController::class, 'restore']);
});

