import { Component, OnInit } from "@angular/core";
import { UserService } from "../../../user.service";
import { Observable } from "rxjs";
import { NgForm } from "@angular/forms";
import { GameService } from "../../game.service";
import { Router } from "@angular/router";

@Component({
    selector: "app-game-create-form",
    templateUrl: "./game-create-form.component.html",
    styleUrls: ["./game-create-form.component.css"]
})
export class GameCreateFormComponent implements OnInit {

    loading: boolean = true;
    players;
    opponentId: number;


    constructor(
        private router: Router,
        private userService: UserService,
        private gameService: GameService
    ) {}

    ngOnInit() {
        Observable.forkJoin(
            this.userService.getPlayers()
        ).subscribe(response => {
            this.loading = false;
            this.players = response[0];
        });
    }

    handleSubmit(form: NgForm) {
        if (form.valid) {
            this.gameService.create(form.value).subscribe(
                response => {
                    this.router.navigate([`/games/detail/${response['id']}`]);
                }
            )
        }
    }
}
