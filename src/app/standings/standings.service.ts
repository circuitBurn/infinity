import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Standing } from './standings/standings.models';

@Injectable({
  providedIn: 'root'
})
export class StandingsService {

  constructor(
      private http: HttpClient
  ) { }

  get() {
      return this.http.get<Standing[]>('standings');
  }
}
