import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Vuelo } from '../interfaces/vuelos.interface';

@Injectable({
  providedIn: 'root',
})
export class VuelosService {
  // private baseUrl: string = environment.baseUrl;
  private baseUrl: string = 'https://reservas-app-back.onrender.com';

  constructor(private http: HttpClient) {}

  getVuelos(): Observable<Vuelo[]> {
    return this.http.get<Vuelo[]>(`${this.baseUrl}/vuelos`);
  }
}
