import { Component, OnInit } from "@angular/core";
import { GameService } from "../../game.service";
import { ActivatedRoute, Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { SnackBarService } from "../../../snack-bar.service";
import { Operative } from "../../../intelligence-operatives/models/operative.model";
import { Observable } from "rxjs";
import { OperativeService } from "../../../intelligence-operatives/operative.service";

@Component({
  selector: "app-game-detail",
  templateUrl: "./game-detail.component.html",
  styleUrls: ["./game-detail.component.css"]
})
export class GameDetailComponent implements OnInit {
  initialized: boolean;
  gameId: number;
  game = {};
  disabled: boolean;

  painting = [
    {
      description: "Fully Painted and Based.",
      value: 10
    },
    {
      description: "Fully Painted, and Some Based.",
      value: 8
    },
    {
      description: "Fully Painted, None Based.",
      value: 6
    },
    {
      description: "Some Painted and Based.",
      value: 4
    },
    {
      description: "Some Painted.",
      value: 2
    },
    {
      description: "Not Painted.",
      value: 0
    }
  ];

  sportsmanship = [
    {
      description: "This is the best game I’ve ever played.",
      value: 10
    },
    {
      description:
        " The game as great, and my opponent was gracious in winning or in defeat.",
      value: 7
    },
    {
      description:
        "The game as fun, and I have no complaints about my Opponent.",
      value: 5
    },
    {
      description:
        "The game was alright, though it wasn’t as fun as it could have been.",
      value: 3
    },
    {
      description: "My game wasn’t fun, and my opponent was combative.",
      value: 0
    }
  ];

  objectives = [
    {
      description:
        "I won the game, and it was a crushing victory (3x Objective Points or more).",
      value: 10
    },
    {
      description: "I won the game.",
      value: 7
    },
    {
      description: "The game was a tie.",
      value: 5
    },
    {
      description: "I lost the game.",
      value: 4
    },
    {
      description:
        "I lost the game, and it was a crushing defeat (3x Objective Points or more).",
      value: 3
    }
  ];

  operatives: Operative[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private gameService: GameService,
    private snackBar: SnackBarService,
    private operativeService: OperativeService
  ) {
    this.initialized = false;
    this.operatives = [];
    this.disabled = false;
    this.route.params.subscribe(params => {
      this.gameId = params["id"];
    });
  }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    Observable.forkJoin(
      this.gameService.retrieve(this.gameId),
      this.operativeService.getMyOperatives()
    ).subscribe(response => {
      this.initialized = true;
      console.log(response);
      const game = response[0];
      this.game = response[0];
      this.operatives = response[1];

      // BIG FUCKING HACK
      this.game["objectives"] = +game["objectives"];
      this.game["sportsmanship"] = +game["sportsmanship"];
      this.game["painting"] = +game["painting"];
      this.game["scenario_accomplished"] = +game["scenario_accomplished"] === 1;
      this.game["operative_id"] = this.operatives[0].id;
      this.disabled = game["status"] === "finished";
    });
  }

  handleSubmit(form: NgForm) {
    this.disabled = true;
    if (form.valid) {
      this.gameService.submit(this.gameId, form.value).subscribe(
        _ => {
          this.snackBar.open("Your game was recorded");
          this.router.navigate(["/games"]);
        },
        _ => {
          this.snackBar.open("Error: Your game was NOT recorded.");
          this.disabled = false;
        }
      );
    }
  }

  handleDelete() {
    let result = confirm("Delete this game?");
    if (result) {
      this.gameService.destroy(this.gameId).subscribe(
        _ => {
          this.snackBar.open("Game deleted.");
          this.router.navigate(["/games"]);
        },
        _ => {
          this.snackBar.open("Error: Your game was NOT deleted.");
        }
      );
    }
  }
}
