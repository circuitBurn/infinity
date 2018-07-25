import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { GameService } from "../../game.service";
import { Games } from "../../models/game.model";

@Component({
  selector: "app-game-dashboard",
  templateUrl: "./game-dashboard.component.html",
  styleUrls: ["./game-dashboard.component.css"]
})
export class GameDashboardComponent implements OnInit, OnDestroy {

    interval;
    activeColumns: string[] = ['opponent', 'date'];
    displayedColumns: string[] = ['rank', 'opponent', 'date'];
    games: Games = {
        active: [],
        finished: []
    };

    constructor(
        private router: Router,
        private gameService: GameService
    ) {
        this.interval = setInterval(() => { this.gameService.retrieveAll(); }, 10000);
    }

    ngOnInit() {
        this.gameService.games$.subscribe(games => {
            this.games = games;
        });
    }

    ngOnDestroy() {
        clearInterval(this.interval);
      }

    viewGame(game) {
        this.router.navigate([`/games/detail/${game.id}`]);
    }
}
