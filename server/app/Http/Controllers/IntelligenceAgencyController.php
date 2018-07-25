<?php

namespace App\Http\Controllers;

use DB;
use App\Intel;
use App\IntelligenceAgency;
use App\IntelligenceOperative;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class IntelligenceAgencyController extends Controller
{
    public function getAll(Request $request)
    {
        return IntelligenceAgency::all();
    }

    public function get(Request $request, $id)
    {
        $agency = IntelligenceAgency::find($id);
        $operatives = IntelligenceOperative::getAgencyOperatives($agency->id);
        $agency->operatives = $operatives;
        return $agency;
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required',
            'description' => 'required',
        ]);

        $agency = IntelligenceAgency::find($id);
        $agency->name = $request->input("name");
        $agency->description = $request->input("description");
        $agency->save();
    }

    public function declareBankrupcy(Request $request)
    {

        $userId = Auth::user()->id;

        DB::transaction(function () use ($userId) {
            $agency = IntelligenceAgency::where("user_id", "=", $userId)->first();

            if (isset($agency) && $agency->user_id == $userId) {
                // Retrieve all Operatives
                $operatives = IntelligenceOperative::where("agency_id", "=", $agency->id)->update(["controller_id" => null]);

                // Get rid of Intel
                $intel = Intel::where("user_id", "=", $userId)->first();
                $intel->value = 0;
                $intel->save();
            }

        });

    }

}
