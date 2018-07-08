import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Intel } from './models/intel.model';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { IntelTransaction } from './models/intel-transaction.model';

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

  transfer(data) {
      return this.http.post('intel/transfer', data);
  }

  getTransactions() {
      return this.http.get<IntelTransaction[]>('intel/transactions').map(
          transactions => {
              for (let transaction of transactions) {
                  transaction.date = new Date(transaction.date['date'] + ' UTC')
              }
              return transactions;
          }
      )
  }
}
