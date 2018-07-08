<?php

namespace App\Http\Controllers;

use App\IntelligenceOperative;
use App\IntelligenceAgency;
use Illuminate\Http\Request;

class OperativeController extends Controller
{
    function get(Request $request, $id) {
        $operative = IntelligenceOperative::find($id);
        $operative['agency'] = IntelligenceAgency::find($operative->agency_id);
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
}
