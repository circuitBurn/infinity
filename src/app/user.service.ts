import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

    user;

    constructor(
        private http: HttpClient
    ) {
        this.user = window['user'];
        console.log(this.user);
    }

    getUser() {
        return this.user;
    }

    getPlayers() {
        return this.http.get('players');
    }

}
