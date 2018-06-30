<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class IntelligenceOperative extends Model
{
    protected $table = "intelligence_operative";

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'agency_id', 'name'
    ];
}
