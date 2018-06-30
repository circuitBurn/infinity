<?php

namespace App\Http\Controllers;

use App\IntelligenceAgency;
use App\IntelligenceOperative;

use Illuminate\Http\Request;

class IntelligenceAgencyController extends Controller
{
    function getAll(Request $request) {
        return IntelligenceAgency::all();
    }

    function get(Request $request, $id) {
        $agency = IntelligenceAgency::find($id);
        $operatives = IntelligenceOperative::where("agency_id", "=", $agency->id)->get();
        $agency->operatives = $operatives;
        return $agency;
    }

    function update(Request $request, $id) {
        $request->validate([
            'name' => 'required',
            'description' => 'required',
        ]);

        $agency = IntelligenceAgency::find($id);
        $agency->name = $request->input("name");
        $agency->description = $request->input("description");
        $agency->save();
    }
}
