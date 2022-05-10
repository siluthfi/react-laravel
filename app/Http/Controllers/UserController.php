<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function register(Request $request)
    {
        $credentials = $request->validate([
            'name' => 'required|string',
            'email' => 'required|unique:users',
            'password' => 'required',
        ]);

        $credentials['password'] = bcrypt($credentials['password']);
        $user = User::create($credentials);
        $token = $user->createToken('Personal Access Token')->plainTextToken;

        return response()->json([
            'message' => 'User created successfully',
            'data' => $user,
            'token' => $token,
        ]);
    }

    // login attempt
    public function login(Request $request)
    {
        // $credentials = $request->validate([
        //     'email' => 'required', 
        //     'password' => 'required'
        // ]);
        
        if (Auth::attempt(['email' => $request->email, 'password' => $request->password]) ) {
            $user = $request->user();
            $token = $user->createToken('Personal Access Token')->plainTextToken;
            // $token = $tokenResult->token;
            // $token->save();
            return response()->json([
                'access_token' => $token,
                'token_type' => 'Bearer'
            ]);
        } else {
            return response()->json([
                'error' => [
                    'message' => 'Email atau Password salah',
                    'code' => 401,
                ]
            ]);
        }
    }

    public function show(Request $request)
    {
        return response()->json([
            'message' => 'Login Successfully',
            'user' => $request->user(),
        ]);
    }
}
