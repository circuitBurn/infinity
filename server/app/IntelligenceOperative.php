<?php

namespace App;

use App\User;
use App\IntelligenceAgency;
use Illuminate\Database\Eloquent\Model;

class IntelligenceOperative extends Model
{
    protected $table = "intelligence_operative";

    protected $guarded = [];

    public static function giveControlTo($operativeId, $userId) {
        $operative = IntelligenceOperative::find($operativeId);
        $operative->controller_id = $userId;
        $operative->save();
    }


    public static function getAgencyOperatives($agencyId) {
        $operatives = IntelligenceOperative::where("agency_id", "=", $agencyId)->get();
        foreach($operatives as &$operative) {
            if (isset($operative->controller_id)) {
                $operative->controllingPlayer = User::find($operative->controller_id);
            }
            
        }
        return $operatives;
    }


    public static function getControlledOperatives($userId) {
        $operatives = IntelligenceOperative::where("controller_id", "=", $userId)->get();
        foreach($operatives as &$operative) {
            $operative->agency = IntelligenceAgency::find($operative->agency_id);
            $operative->user = User::find($operative->agency->user_id);
        }
        return $operatives;
    }

}
