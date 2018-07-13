import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GameService {

    constructor(
        private http: HttpClient
    ) { 
        this.retrieveAll();
    }

    create(game) {
        return this.http.post('game', game);
    }

    retrieve(id: number) {
        return this.http.get(`game/${id}`);
    }

    retrieveAll() {
        return this.http.get('games');
    }

    submit(id: number, result) {
        return this.http.post(`game/${id}`, result);
    }

    destroy(id: number) {
        return this.http.delete(`game/${id}`);
    }
}
