<?php

namespace App\Http\Controllers;

use DB;
use App\User;
use App\Game;
use App\GamePlayer;
use App\Scenario;
use App\Intel;
use App\IntelTransaction;
use App\IntelligenceOperative;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class GameController extends Controller
{

    function getGameOpponent($gameId, $userId) {
        $opponent = GamePlayer::where("game_id", "=", $gameId)
            ->where("user_id" , "!=", $userId)
            ->first();
        return $opponent;
    }

    function retrieveAll(Request $request) {
        $userId = Auth::user()->id;

        $games = [
            "finished" => [],
            "active" => []
        ];
        $gamePlayers = GamePlayer::where("user_id", "=", $userId)->get();

        foreach($gamePlayers as $gamePlayer) {
            $opponent = self::getGameOpponent($gamePlayer->game_id, $userId);
            $opponentName = User::find($opponent->user_id)->name;
            $details = [
                "opponent" => $opponentName,
                "date" => $gamePlayer->created_at,
                "status" => $gamePlayer->status,
                "id" => $gamePlayer->game_id
            ];
            array_push($games[$gamePlayer->status], $details);
        }
        return $games;
    }


    function retrieve(Request $request, $id) {
        $userId = Auth::user()->id;
        $game = Game::find($id);

        $player = GamePlayer::where("game_id", "=", $game->id)
            ->where("user_id", "=", $userId)->first();

        $opponent = GamePlayer::where("game_id", "=", $game->id)
            ->where("user_id", "!=", $userId)->first();

        $opponentName = User::find($opponent->user_id)->name;

        $scenario = Scenario::find($player->scenario_id);

        $response = [
            "status" => $player->status,
            "opponent" => $opponentName,
            "objectives" => $player->objectives,
            "sportsmanship" => $opponent->sportsmanship,
            "painting" => $opponent->painting,
            "scenario_accomplished" => $player->scenario_accomplished
        ];

        $response["scenario"] = [
            "details" => $scenario->details,
            "value" => $scenario->value
        ];

        return $response;
    }

    function create(Request $request) {

        $userId = Auth::user()->id;

        $request->validate([
            'opponentId' => 'required'
        ]);

        $opponentId = $request->input('opponentId');

        $game = DB::transaction(function() use ($userId, $opponentId) {
            $game = new Game;
            $game->save();

            // game player
            $player = new GamePlayer;
            $player->user_id = $userId;
            $player->game_id = $game->id;
            $player->scenario_id = Scenario::find(rand(1, 12))->id;
            $player->save();

            // opponent
            $opponent = new GamePlayer;
            $opponent->user_id = $opponentId;
            $opponent->game_id = $game->id;
            $opponent->scenario_id = Scenario::find(rand(1, 12))->id;
            $opponent->save();

            return $game;
        });
        
        return $game;
    }

    private static function getPlayerScore($gameId, $userId) {

        $game = Game::find($gameId);

        $player = GamePlayer::where("game_id", "=", $gameId)
            ->where("user_id", "=", $userId)->first();

        $opponent = GamePlayer::where("game_id", "=", $gameId)
            ->where("user_id", "!=", $userId)->first();

        $score = $player->objectives + $opponent->sportsmanship + $opponent->painting;

        return $score;
    }

    function getStandings() {
        $_players = GamePlayer::where("status" , "=", "finished")->get();

        $players = [];
        foreach($_players as $_player) {
            if (!array_key_exists($_player->user_id, $players)) {
                $players[$_player->user_id] = [];
            }

            array_push($players[$_player->user_id], self::getPlayerScore($_player->game_id, $_player->user_id));
        }

        $standings = [];

        // Take the top 5
        foreach($players as $playerId => $scores) {
            $length = count($scores);
            $length = min($length, 5);
            rsort($scores);
            $_scores = array_slice($scores, 0, 5);
            array_push($standings, [
                "name" => User::find($playerId)->name,
                "points" => array_sum($_scores) / $length,
                "gamesPlayed" => count($scores)
            ]);
        }

        usort($standings, function($a, $b) {
            if ($a["points"] == $b["points"]) {
                return 0;
            }
            return ($a["points"] > $b["points"]) ? -1 : 1;
        });

        return $standings;
    }

    function finishGame(Request $request, $id) {

        $userId = Auth::user()->id;

        $request->validate([
            'objectives' => 'required',
            'sportsmanship' => 'required',
            'painting' => 'required',
            "scenario_accomplished" => "required"
        ]);

        $result = $request->input();

        DB::transaction(function() use ($id, $userId, $result, $request) {

            // Enter your details
            $player = GamePlayer::where("game_id", "=", $id)
                ->where("user_id", "=", $userId)->first();
            
            if ($player->status == "active") {
                $player->status = "finished";
                $player->objectives = $result["objectives"];
                $player->scenario_accomplished = $result["scenario_accomplished"];
                $player->save();
    
                // Enter the opponent's details
                $opponent = GamePlayer::where("game_id", "=", $id)
                    ->where("user_id", "!=", $userId)->first();
                $opponent->sportsmanship = $result["sportsmanship"];
                $opponent->painting = $result["painting"];
                $opponent->save();

                $lost = $result['objectives'] < 5;
                if ($lost && $request->input("operative_disabled")) {
                    // Give control to opposing player
                    $operativeId = $result['operative_id'];
                    $operative = IntelligenceOperative::find($operativeId);
                    $operative->controller_id = $opponent->user_id;
                    $operative->save();
                }

                // Assign intel
                if ($result["scenario_accomplished"]) {
                    $scenario = Scenario::find($player->scenario_id);

                    $myIntel = Intel::where("user_id", "=", $userId)->first();

                    $myIntel->value += $scenario->value;
                    $myIntel->save();

                    $transaction = new IntelTransaction;
                    $transaction->type = 'objective';
                    $transaction->value = $scenario->value;
                    $transaction->user_id = $userId;
                    $transaction->to_user_id = $player->id;
                    $transaction->message = "You completed a mission.";
                    $transaction->save();
                }
                
            } 

        });

    }


    /**
     * Delete the specified Game.
     */
    function destroy(Request $request, $id) {
        $userId = Auth::user()->id;
        DB::transaction(function() use ($id) {
            GamePlayer::where('game_id', $id)->delete();
            Game::destroy($id);
        });
    }
}
