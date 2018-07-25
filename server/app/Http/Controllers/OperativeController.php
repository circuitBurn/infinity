<?php

namespace App\Http\Controllers;

use App\User;
use App\IntelligenceOperative;
use App\IntelligenceAgency;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OperativeController extends Controller
{
    function getMyOperatives(Request $request) {
        $userId = Auth::user()->id;

        $agency = IntelligenceAgency::where("user_id", "=", $userId)->first();
        $operatives = IntelligenceOperative::getAgencyOperatives($agency->id);
        return $operatives;
    }

    function getControlledOperatives(Request $request) {
        $userId = Auth::user()->id;
        $operatives = IntelligenceOperative::getControlledOperatives($userId);
        return $operatives;
    }
    
    function get(Request $request, $id) {
        $operative = IntelligenceOperative::find($id);
        $operative->agency = IntelligenceAgency::find($operative->agency_id);
        if (isset($operative->controller_id)) {
            $operative->controllingPlayer = User::find($operative->controller_id);
        }
        return $operative;
    }

    function update(Request $request, $id) {
        $request->validate([
            'name' => 'required',
            'description' => 'required',
        ]);
        // TODO: fill the rest of it out

        logger("Updating Operative: " . $id);
        logger(json_encode($request->input()));

        IntelligenceOperative::find($id)->update($request->input());
        

        // $agency = IntelligenceOperative::find($id);
        // $agency->name = $request->input("name");
        // $agency->description = $request->input("description");
        // $agency->save();
    }


    function giveControlTo(Request $request, $id) {
        $request->validate([
            'playerId' => 'required',
        ]);
        $userId = Auth::user()->id;
        $playerId = $request->input("playerId");
        $operative = IntelligenceOperative::find($id);
        $agency = IntelligenceAgency::find($operative->agency_id);
        if ($playerId == $agency->user_id) {
            $operative->controller_id = null;
            $operative->save();
        } else {
            $operative->controller_id = $playerId;
            $operative->save();
        }
    }
}
