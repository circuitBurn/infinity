import { Component, OnInit } from "@angular/core";
import { OperativeService } from "../operative.service";
import { ActivatedRoute } from "@angular/router";
import { Operative } from "../models/operative.model";
import { MatSnackBar } from "@angular/material";
import { UserService } from "../../user.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-operative-detail",
  templateUrl: "./operative-detail.component.html",
  styleUrls: ["./operative-detail.component.css"]
})
export class OperativeDetailComponent implements OnInit {
  loading: boolean = true;
  operative: Operative;
  editing: boolean = false;
  showEdit: boolean = false;
  players;

  controllingPlayer;

  constructor(
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private userService: UserService,
    private operativeService: OperativeService
  ) {}

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.route.params.subscribe(params => {
      const id = params["id"];

      Observable.forkJoin(
        this.operativeService.getOperative(id),
        this.userService.getPlayers()
      ).subscribe(response => {
          console.log(response);
          this.loading = false;
          this.operative = response[0];
          if (this.operative['controllingPlayer']) {
            this.controllingPlayer = this.operative['controllingPlayer'];
          }
          this.players = response[1];
          this.loading = false;
          this.showEdit = this.userService.getUser().id == this.operative['agency']['user_id'];
      });
    });
  }

  handleEdit() {
    this.editing = true;
  }

  onUpdate(operative: Operative) {
    this.editing = false;
    this.operativeService.update(operative).subscribe(
      response => {
        this.openSnackBar("Operative Updated");
        this.refresh();
      },
      error => {
        this.openSnackBar("Something went wrong! Operative not Updated");
      }
    );
  }

  onUpdateCancel() {
    this.editing = false;
  }

  openSnackBar(message: string, action: string = "OK") {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }
}
