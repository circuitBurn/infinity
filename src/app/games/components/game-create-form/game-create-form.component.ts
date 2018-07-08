import { Component, OnInit } from "@angular/core";
import { UserService } from "../../../user.service";
import { MatSnackBar } from "@angular/material";
import { Observable } from "rxjs";

@Component({
    selector: "app-game-create-form",
    templateUrl: "./game-create-form.component.html",
    styleUrls: ["./game-create-form.component.css"]
})
export class GameCreateFormComponent implements OnInit {

    loading: boolean = true;
    players;
    playerId: number;

    constructor(
        private userService: UserService,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit() {
        Observable.forkJoin(
            this.getPlayers()
        ).subscribe(response => {
            this.loading = false;
        });
    }

    getPlayers() {
        return this.userService.getPlayers().map(players => {
            this.players = players;
        });
    }

    handleSubmit(form, valid) {
        if (valid) {
            // console.log(form);
        }
    }
}
