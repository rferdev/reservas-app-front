import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { Reserva } from '../interfaces/reserva.interface';

@Injectable({
  providedIn: 'root',
})
export class ReservasService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  createReserva(vueloId: number): Observable<Reserva[]> {
    return this.http.post<Reserva[]>(`${this.apiUrl}/reservas`, {
      vueloId,
    });
  }

  getAllReservas(): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(`${this.apiUrl}/reservas`);
  }

  getReserva(id: number): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(`${this.apiUrl}/reservas/${id}`);
  }

  deleteReserva(id: number): Observable<Reserva[]> {
    return this.http.delete<Reserva[]>(`${this.apiUrl}/reservas/${id}`);
  }
}
