import { Component, OnInit, Inject, OnDestroy } from "@angular/core";
import { OperativeService } from "../intelligence-operatives/operative.service";
import { Observable } from "../../../node_modules/rxjs";
import "rxjs/observable/forkJoin";
import { SnackBarService } from "../snack-bar.service";
import { IntelligenceAgenciesService } from "../intelligence-agencies/intelligence-agencies.service";
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog
} from "../../../node_modules/@angular/material";
import { UserService } from "../user.service";

@Component({
  selector: "dialog-select-player",
  template: `
  <h1 mat-dialog-title>Select Player</h1>
  <div mat-dialog-content>
    <mat-form-field class="input-full-width">
        <mat-select placeholder="Select Opponent" [(ngModel)]="opponentId" name="opponentId" required>
            <mat-option [value]="player.id" *ngFor="let player of data.players">
                {{ player.name }}
            </mat-option>
        </mat-select>
    </mat-form-field>
  </div>
  <div mat-dialog-actions>
    <button mat-button (click)="onNoClick()">Cancel</button>
    <button mat-button [mat-dialog-close]="opponentId" cdkFocusInitial>Ok</button>
  </div>
  `
})
export class DialogSelectPlayer {

    opponentId;
  constructor(
    public dialogRef: MatDialogRef<DialogSelectPlayer>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit, OnDestroy {
  initialized: boolean = false;
  operatives: any[];
  players;
  interval;
  operativeHeaders = ["name", "user", "agency", "actions"];

  constructor(
    private operativeService: OperativeService,
    private agencyService: IntelligenceAgenciesService,
    private snackBar: SnackBarService,
    private userService: UserService,
    public dialog: MatDialog
  ) {
    this.interval = setInterval(() => { this.ngOnInit(); }, 10000);
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogSelectPlayer, {
      width: "500px",
      data: { players: this.players }
    });

    return dialogRef.afterClosed();
  }

  ngOnInit() {
    Observable.forkJoin(
      this.operativeService.getControlledOperatives(),
      this.userService.getPlayers()
    ).subscribe(response => {
      this.initialized = true;
      this.operatives = response[0];
      this.players = response[1];
      console.log(response);
    });
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  handleGiveControlTo(id: number) {
    this.openDialog().subscribe(result => {
        if (!result) return;
        this.operativeService.giveControlTo(id, result).subscribe(response => {
            this.snackBar.open("Operative Transferred");
            this.ngOnInit();
        });
      });
  }

  handleBankrupcy() {
    var r = confirm("Really declare bankrupcy?");
    if (r) {
      this.agencyService.declareBankrupcy().subscribe(response => {
        this.snackBar.open("You've declared bankrupcy");
        this.ngOnInit();
      });
    }
  }
}
