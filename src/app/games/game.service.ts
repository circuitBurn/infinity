import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Games } from './models/game.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {

    games$: BehaviorSubject<Games> = new BehaviorSubject<Games>({
        active: [],
        finished: []
    });

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
        return this.http.get<Games>('games').subscribe(games => {
            this.games$.next(games);
        });
    }

    submit(id: number, result) {
        return this.http.post(`game/${id}`, result);
    }

    destroy(id: number) {
        return this.http.delete(`game/${id}`);
    }
}
