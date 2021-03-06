<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Auth::routes();

Route::get('logout', '\App\Http\Controllers\Auth\LoginController@logout');

Route::middleware(['auth'])->group(function () {

    Route::get('/', 'HomeController@index')->name('home');
    
    Route::get('players', 'UserController@players');

    Route::post('user', 'UserController@update');
    Route::post('password', 'UserController@updatePassword');

    // Intel
    Route::get('myintel', 'IntelController@getMyIntel');
    Route::post('intel/transfer', 'IntelController@transfer');
    Route::get('intel/transactions', 'IntelController@getTransactions');

    // Agencies
    Route::get('agencies', 'IntelligenceAgencyController@getAll');
    Route::get('agencies/{id}', 'IntelligenceAgencyController@get');
    Route::post('agencies/{id}', 'IntelligenceAgencyController@update');
    Route::post('declarebankrupcy', 'IntelligenceAgencyController@declareBankrupcy');

    // Operatives
    Route::get('operatives', 'OperativeController@getMyOperatives');
    Route::get('operatives/{id}', 'OperativeController@get');
    Route::post('operatives/{id}', 'OperativeController@update');
    Route::post('operatives/{id}/giveto', 'OperativeController@giveControlTo');
    Route::get('controlledoperatives', 'OperativeController@getControlledOperatives');

    // TODO: Games
    Route::get('games', 'GameController@retrieveAll');
    Route::get('game/{id}', 'GameController@retrieve');
    Route::post('game', 'GameController@create');
    Route::post('game/{id}', 'GameController@finishGame');
    Route::delete('game/{id}', 'GameController@destroy');

    // Standings
    Route::get('standings', 'GameController@getStandings');
});