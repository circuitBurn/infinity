import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { GameService } from "../../game.service";

@Component({
  selector: "app-game-dashboard",
  templateUrl: "./game-dashboard.component.html",
  styleUrls: ["./game-dashboard.component.css"]
})
export class GameDashboardComponent implements OnInit {

    activeColumns: string[] = ['opponent', 'date'];
    displayedColumns: string[] = ['rank', 'opponent', 'date'];
    games;

    constructor(
        private router: Router,
        private gameService: GameService
    ) {}

    ngOnInit() {
        this.refresh();
    }

    refresh() {
        this.gameService.retrieveAll().subscribe(games => {
            this.games = games
        });
    }

    viewGame(game) {
        this.router.navigate([`/games/detail/${game.id}`]);
    }
}
