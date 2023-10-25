import { Injectable } from '@angular/core';
import { Reserva } from '../interfaces/reservas.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReservasService {
  // private baseUrl: string = environment.baseUrl;
  private baseUrl: string = 'https://reservas-app-back.onrender.com';

  constructor(private http: HttpClient) {}

  createReserva(vueloID: number): Observable<Reserva[]> {
    return this.http.post<Reserva[]>(`${this.baseUrl}/reservas`, { vueloID });
  }

  getAllReservas(): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(`${this.baseUrl}/reservas`);
  }

  getReserva(id: number): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(`${this.baseUrl}/reservas/${id}`);
  }
}
