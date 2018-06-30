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
        console.log(operative);
        return this.http.post(`operative/${operative.id}`, operative);
    }
}
