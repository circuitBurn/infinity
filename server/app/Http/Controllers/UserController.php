<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public static function players(Request $request)
    {
        $userId = Auth::user()->id;
        return User::where("id", "!=", $userId)->get();
    }
}
