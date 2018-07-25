import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";


@Injectable()
export class IntelligenceAgenciesService {
  
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
        return this.http.post(`agencies/${agency.id}`, agency);
    }

    declareBankrupcy() {
        return this.http.post('declarebankrupcy', {});
    }
}
