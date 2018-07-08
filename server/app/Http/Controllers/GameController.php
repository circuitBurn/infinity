<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class GameController extends Controller
{
    function create(Request $request) {

        $userId = Auth::user()->id;

        $request->validate([
            'playerId' => 'required'
        ]);

        // TODO: create the game
        // TODO: create each game player
        // TODO: return the game
    }
}
