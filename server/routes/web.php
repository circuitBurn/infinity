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

    // Operatives
    Route::get('operatives/{id}', 'OperativeController@get');
    Route::post('operatives/{id}', 'OperativeController@update');

    // TODO: Games

});