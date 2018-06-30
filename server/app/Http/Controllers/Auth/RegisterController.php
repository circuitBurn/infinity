<?php

namespace App\Http\Controllers\Auth;

use DB;
use App\User;
use App\Intel;
use App\IntelligenceAgency;
use App\IntelligenceOperative;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Foundation\Auth\RegistersUsers;

class RegisterController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation. By default this controller uses a trait to
    | provide this functionality without requiring any additional code.
    |
    */

    use RegistersUsers;

    /**
     * Where to redirect users after registration.
     *
     * @var string
     */
    protected $redirectTo = '/';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
        ]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return \App\User
     */
    protected function create(array $data)
    {
        $user = DB::transaction(function() use ($data) {
            $user = User::create([
                'name' => $data['name'],
                'email' => $data['email'],
                'password' => Hash::make($data['password']),
            ]);
    
            Intel::create([
                "user_id" => $user->id,
                "value" => 2
            ]);
    
            // TODO: create an agency
            $agency = new IntelligenceAgency;
            $agency->name = $data["name"] . " - Intelligence Agency";
            $agency->description = "There is no data on this agency.";
            $agency->user_id = $user->id;
            $agency->save();
    
            IntelligenceOperative::create(["agency_id" => $agency->id, "name" => "Operative 1", "description" => "There is no data on this operative."]);
            IntelligenceOperative::create(["agency_id" => $agency->id, "name" => "Operative 2", "description" => "There is no data on this operative."]);
            IntelligenceOperative::create(["agency_id" => $agency->id, "name" => "Operative 3", "description" => "There is no data on this operative."]);
            IntelligenceOperative::create(["agency_id" => $agency->id, "name" => "Operative 4", "description" => "There is no data on this operative."]);
            IntelligenceOperative::create(["agency_id" => $agency->id, "name" => "Operative 5", "description" => "There is no data on this operative."]);
            return $user;
        });

        return $user;
    }
}
