import { Component, OnInit } from "@angular/core";
import { UserService } from "../../user.service";
import { IntelService } from "../intel.service";
import { MatSnackBar } from "@angular/material";
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/map';
import { Intel } from "../models/intel.model";

export class IntelTransfer {
    playerId: number;
    value: number;
}

@Component({
  selector: "app-intel-dashboard",
  templateUrl: "./intel-dashboard.component.html",
  styleUrls: ["./intel-dashboard.component.css"]
})
export class IntelDashboardComponent implements OnInit {
    
    loading: boolean = true;
    intel: Intel;
    players;
    
    model = new IntelTransfer();

    constructor(
        private userService: UserService,
        private intelService: IntelService,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit() {
        Observable.forkJoin(
            this.getMyIntel(),
            this.getPlayers()
          ).subscribe(response => {
              this.loading = false;
          });
    }

    getPlayers() {
        return this.userService.getPlayers().map(
            players => {
                this.players = players;
            }
        )
    }

    getMyIntel() {
        return this.intelService.getMyIntel().map(
            response => {
                console.log(response);
                this.loading = false;
                this.intel = response;
            },
            error => {
                console.log(error);
                this.loading = false;
            }
        )
    }

    handleSubmit(transfer, isValid: boolean) {
        this.intelService.transfer(this.model.playerId, this.model.value).subscribe(
            response => {
                this.openSnackBar("Transfer Complete");
            },
            error => {
                if (error.status === 'error') {
                    this.openSnackBar(error.message);
                } else {
                    this.openSnackBar("Could not complete transfer");
                }
                
            }
        )
    }

    openSnackBar(message: string, action: string = "OK") {
        this.snackBar.open(message, action, {
            duration: 2000,
        });
    }
}
