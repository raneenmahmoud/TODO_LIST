<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        {
            // Validate the request data
            $validatedData = $request->validate([
                'name' => 'required|string',
                'email' => 'required|email|unique:users',
                'password' => 'required|string|min:6',
            ]);

            // Create a new user
            $user = User::create([
                'name' => $validatedData['name'],
                'email' => $validatedData['email'],
                'password' => Hash::make($validatedData['password']),
            ]);

            // Generate token for the user
            $token = Auth::login($user);

            // Return the token as a response
            return response()->json(['token' => $token], 200);
        }
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $token = $user->createToken('authToken');

            return response()->json([
                'user' => $user,
                'access_token' => $token->plainTextToken,
            ]);
            $data = $response->getData();

        }

        return response()->json(['error' => 'Unauthenticated'], 401);
    }
}
