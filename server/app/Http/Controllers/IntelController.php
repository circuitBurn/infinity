<?php

namespace App\Http\Controllers;

use DB;
use Exception;
use App\Intel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class IntelController extends Controller
{

    public function getMyIntel(Request $request) {
        $userId = Auth::user()->id;
        $myIntel = Intel::where("user_id", "=", $userId)->first();
        return $myIntel;
    }

    public function transfer(Request $request) {

        $userId = Auth::user()->id;

        $playerId = $request->input('playerId');
        $amount = $request->input('amount');

        // Validate
        

        if (!isset($playerId)) {
            throw new \Exception("User must be specified");
        }

        DB::transaction(function () use ($userId, $playerId, $amount) {
            $myIntel = Intel::where("user_id", "=", $userId)->first();

            if ($amount < 1) {
                throw new \Exception("Please transfer a value greater than 0.");
            }

            if ($amount > $myIntel->value) {
                $returnData = array(
                    'status' => 'error',
                    'message' => 'You fuck!'
                );
                return response($returnData, 400);
            }

            $myIntel->value -= $amount;
            $myIntel->save();

            $toIntel = Intel::where("user_id", "=", $playerId)->first();
            $toIntel->value += $amount;
            $toIntel->save();
        }, 5);

    }
}
