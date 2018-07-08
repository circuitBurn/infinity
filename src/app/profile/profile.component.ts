import { Component, OnInit } from "@angular/core";
import { UserService } from "../user.service";
import { MatSnackBar } from "@angular/material";

@Component({
    selector: "app-profile",
    templateUrl: "./profile.component.html",
    styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
    user;
    errors;

    passwordReset = {
        currentPassword: "",
        password: "",
        passwordConfirm: ""
    };

    constructor(
        private snackBar: MatSnackBar,
        private userService: UserService
    ) {}

    ngOnInit() {
        this.user = this.userService.getUser();
    }

    handleSubmit(form, valid) {
        if (valid) {
            this.userService.update(form).subscribe(
                response => {
                    this.errors = null;
                    this.openSnackBar("Your profile has been updated.");
                },
                error => {
                    this.errors = error.errors;
                    this.openSnackBar("Error: Your profile has NOT been updated.");
                }
            )
        }
    }

    handlePasswordResetSubmit(form, valid) {
        if (valid) {
            this.userService.updatePassword(form).subscribe(
                response => {
                    this.errors = null;
                    this.openSnackBar("Your password has been updated.");
                    this.passwordReset = {
                        currentPassword: "",
                        password: "",
                        passwordConfirm: ""
                    };
                },
                error => {
                    this.errors = error.error.errors;
                    this.openSnackBar("Error: Your password has NOT been updated.");
                }
            )
        }
    }

    openSnackBar(message: string, action: string = "OK") {
        this.snackBar.open(message, action, {
            duration: 2000
        });
    }
}
