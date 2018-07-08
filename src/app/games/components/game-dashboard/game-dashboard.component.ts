import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-game-dashboard",
    templateUrl: "./game-dashboard.component.html",
    styleUrls: ["./game-dashboard.component.css"]
})
export class GameDashboardComponent implements OnInit {

    games;
    constructor() {}

    ngOnInit() {

        // TODO
        this.games = {
            "pending": [],
            "playing": [],
            "complete": []
        }
    }
}
