import { Injectable } from "@angular/core";
import { MatSnackBar } from "../../node_modules/@angular/material";

@Injectable({
  providedIn: "root"
})
export class SnackBarService {
  constructor(private snackBar: MatSnackBar) {}

  open(message: string, action: string = "OK") {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }
}
