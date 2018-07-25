import { Injectable } from "@angular/core";
import { HttpResponse, HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Operative } from "./models/operative.model";

@Injectable()
export class OperativeService {

    constructor(
        private http: HttpClient
    ) {}

    getOperative(id): Observable<Operative> {
        return this.http.get<Operative>(`operatives/${id}`);
    }

    update(operative: Operative) {
        return this.http.post(`operatives/${operative.id}`, operative);
    }

    getMyOperatives() {
        return this.http.get<Operative[]>(`operatives`);
    }

    getControlledOperatives() {
        return this.http.get<Operative[]>(`controlledoperatives`);
    }

    giveControlTo(operativeId: number, playerId: number) {
        return this.http.post(`operatives/${operativeId}/giveto`, {
            playerId: playerId
        });
    }
}
