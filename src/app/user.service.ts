import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import "rxjs/add/operator/map";
import { User } from "./user/user.model";

@Injectable({
  providedIn: "root"
})
export class UserService {
  user: User;

  constructor(private http: HttpClient) {}

  getUser() {
    return this.user;
  }

  setUser(user: User) {
    this.user = user;
  }

  getPlayers() {
    return this.http.get("players");
  }

  isAdmin() {
    return this.user.admin;
  }

update(details) {
    return this.http.post<User>("user", details).map(user => {
      this.setUser(user);
      return user;
    });
  }

  updatePassword(details) {
    return this.http.post("password", details);
  }
}
