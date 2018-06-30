import { Injectable } from "@angular/core";
import { HttpResponse, HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class IntelligenceAgenciesService {

    private agencies = [];
  
    constructor(
        private http: HttpClient
    ) {}

    getAgencies(): any {
        return this.http.get("agencies");
    }

    getAgency(id) {
        return this.http.get(`agencies/${id}`);
    }

    update(agency) {
        console.log(agency);
        return this.http.post(`agencies/${agency.id}`, agency);
    }
}
