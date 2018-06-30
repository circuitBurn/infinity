<?php

namespace App\Http\Controllers;

use App\IntelligenceOperative;
use Illuminate\Http\Request;

class OperativeController extends Controller
{
    function get(Request $request, $id) {
        $operative = IntelligenceOperative::find($id);
        return $operative;
    }

    function update(Request $request, $id) {
        $request->validate([
            'name' => 'required',
            'description' => 'required',
        ]);

        $agency = IntelligenceOperative::find($id);
        $agency->name = $request->input("name");
        $agency->description = $request->input("description");
        $agency->save();
    }
}
