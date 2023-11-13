import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { Vuelo } from '../interfaces/vuelo.interface';

@Injectable({
  providedIn: 'root',
})
export class VuelosService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAllVuelos(): Observable<Vuelo[]> {
    return this.http.get<Vuelo[]>(`${this.apiUrl}/vuelos`);
  }
}
