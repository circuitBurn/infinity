import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class UserService {

    user;

    constructor(
        private http: HttpClient
    ) {}

    getUser() {
        return this.user;
    }

    setUser(user) {
        this.user = user;
    }

    getPlayers() {
        return this.http.get('players');
    }

    isAdmin() {
        return this.user.isAdmin;
    }

    update(details) {
        return this.http.post("user", details).map(user => {
            this.setUser(user);
            return user;
        });
    }

    updatePassword(details) {
        return this.http.post("password", details);
    }

}
