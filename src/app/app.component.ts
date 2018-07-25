import { Component, ChangeDetectorRef, OnInit } from "@angular/core";
import { MediaMatcher } from "@angular/cdk/layout";
import { UserService } from "./user.service";
import { User } from "./user/user.model";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "app";

  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  user: User;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private userService: UserService
  ) {
    this.mobileQuery = media.matchMedia("(max-width: 600px)");
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    window["user"]["admin"] = +window["user"]["admin"];
    this.userService.setUser(window["user"]);
    this.user = this.userService.getUser();
    console.log(this.user);
  }
}
