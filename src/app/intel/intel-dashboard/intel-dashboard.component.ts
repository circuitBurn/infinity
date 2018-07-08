import { Component, OnInit } from "@angular/core";
import { UserService } from "../../user.service";
import { IntelService } from "../intel.service";
import { MatSnackBar } from "@angular/material";
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/map';

import { Intel } from "../models/intel.model";
import { IntelTransaction } from "../models/intel-transaction.model";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-intel-dashboard",
  templateUrl: "./intel-dashboard.component.html",
  styleUrls: ["./intel-dashboard.component.css"]
})
export class IntelDashboardComponent implements OnInit {
    
    loading: boolean = true;
    intel: Intel;
    players;

    transactions: IntelTransaction[];
    
    model; // TODO

    constructor(
        private userService: UserService,
        private intelService: IntelService,
        private snackBar: MatSnackBar
    ) {
        this.model = {
            playerId: null,
            value: null,
            message: null
        };
    }

    ngOnInit() {
        this.refresh();
    }

    refresh() {
        this.model = {
            playerId: null,
            value: null,
            message: null
        };
        Observable.forkJoin(
            this.intelService.getMyIntel(),
            this.userService.getPlayers(),
            this.intelService.getTransactions()
          ).subscribe(response => {
              this.loading = false;
              this.intel = response[0];
              this.players = response[1];
              this.transactions = response[2];
          });
    }

    handleSubmit(form: NgForm, valid: boolean) {
        console.log(form);
        const data = {
            playerId: this.model.playerId,
            value: this.model.value,
            message: this.model.message
        };
        this.intelService.transfer(data).subscribe(
            response => {
                this.openSnackBar("Transfer Complete");
                form.reset();
                this.refresh();
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
