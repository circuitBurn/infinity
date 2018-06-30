<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateIntelligenceOperativeTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('intelligence_operative', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->unsignedInteger('agency_id');
            $table->foreign('agency_id')->references('id')->on('intelligence_agnecy');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('intelligence_operative');
    }
}
