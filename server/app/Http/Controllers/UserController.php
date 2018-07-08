<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    function players(Request $request) {
        $userId = Auth::user()->id;
        return User::where("id", "!=", $userId)->get();
    }

    function update(Request $request) {
        $userId = Auth::user()->id;

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255',
        ]);

        $user = User::find($userId);
        $user->name = $request->input('name');
        $user->email = $request->input('email');
        $user->save();
        return $user;
    }

    function updatePassword(Request $request) {
        $userId = Auth::user()->id;

        $request->validate([
            'password' => 'required|string|min:6',
            'passwordConfirm' => 'required|same:password',
        ],[
            'password.required' => 'Password is required',
            'password.min' => 'Password needs to have at least 6 characters',
            'passwordConfirm.required' => 'Passwords do not match'
        ]);

        $user = User::find($userId);
            $user->password = \Hash::make($request->input('password'));
            $user->save();
            return $user;

    }
}
