<?php

namespace App\Http\Controllers;

use DB;
use Exception;
use App\User;
use App\Intel;
use App\IntelTransaction;
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
        $value = $request->input('value');
        $message = $request->input("message");
        if (!isset($message)) {
            $message = "You've sent Intel!";
        }

        // Validate

        if (!isset($playerId)) {
            throw new \Exception("User must be specified");
        }

        $remainingIntel = DB::transaction(function () use ($userId, $playerId, $value, $message) {
            $myIntel = Intel::where("user_id", "=", $userId)->first();

            if ($value < 1) {
                throw new \Exception("Please transfer a value greater than 0.");
            }

            if ($value > $myIntel->value) {
                $returnData = array(
                    'status' => 'error'
                );
                return response($returnData, 400);
            }

            $myIntel->value -= $value;
            $myIntel->save();

            $toIntel = Intel::where("user_id", "=", $playerId)->first();
            $toIntel->value += $value;
            $toIntel->save();


            $transaction = new IntelTransaction;
            $transaction->type = 'sent';
            $transaction->value = $value;
            $transaction->user_id = $userId;
            $transaction->to_user_id = $playerId;
            $transaction->message = $message;
            $transaction->save();

            return $myIntel->value;
        }, 5);

        return $remainingIntel;

    }

    function getTransactions(Request $request) {
        $userId = Auth::user()->id;

        $rawTransactions = IntelTransaction::where('user_id', '=', $userId)
            ->orWhere('to_user_id', '=', $userId)
            ->orderBy('created_at', 'desc')
            ->get();

        $transactions = [];
        foreach($rawTransactions as $_transaction) {

            switch($_transaction->type) {
                case "sent":
                    $name = User::find($_transaction->to_user_id)->name;
                    break;
                case "received":
                    $name = User::find($_transaction->user_id)->name;
                    break;
                case "objective":
                case "bankrupcy":
                    $name = "<<< SYSTEM >>>";
                    break;
            }

            // Create a client-viewable transaction
            $transaction = [
                "name" => $name,
                "value" => $_transaction->value,
                "type" => $_transaction->type,
                "date" => $_transaction->created_at,
                "message" => $_transaction->message
            ];

            array_push($transactions, $transaction);
        }

        return $transactions;
    }

}
