import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Intel } from './models/intel.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IntelService {

  constructor(
      private http: HttpClient
  ) { }

  getMyIntel(): Observable<Intel> {
      return this.http.get<Intel>(`myintel`);
  }

  transfer(userId, amount) {
      return this.http.post('intel/transfer', {
          playerId: userId,
          amount: amount
      });
  }
}
