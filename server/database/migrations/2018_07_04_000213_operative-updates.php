<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class OperativeUpdates extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('intelligence_operative', function (Blueprint $table) {
            $table->string('type')->nullable();
            $table->string('mov')->default("4-4");
            $table->integer('cc')->default(10);
            $table->integer('bs')->default(10);
            $table->integer('ph')->default(10);
            $table->integer('wp')->default(10);
            $table->integer('arm')->default(1);
            $table->integer('bts')->default(0);
            $table->integer('w')->default(10);
            $table->integer('s')->default(2);
            $table->string('equipment')->nullable();
            $table->string('skills')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
