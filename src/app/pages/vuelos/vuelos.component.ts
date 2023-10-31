import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Vuelo } from 'src/app/interfaces/vuelos.interface';

import { VuelosService } from 'src/app/services/vuelos.service';
import { ReservasService } from 'src/app/services/reservas.service';

@Component({
  selector: 'app-vuelos',
  templateUrl: './vuelos.component.html',
  styleUrls: ['./vuelos.component.scss'],
})
export class VuelosComponent implements OnInit {
  VUELOS_DATA!: Vuelo[];

  displayedColumns: string[] = [
    // 'vueloid',
    'codigo',
    'origen',
    'destino',
    'salida',
    'llegada',
    'capacidad',
    'acciones',
  ];

  dataSource = new MatTableDataSource<Vuelo>([]);

  constructor(
    private vuelosService: VuelosService,
    private reservasService: ReservasService
  ) {}

  ngOnInit(): void {
    this.vuelosService.getAllVuelos().subscribe((vuelos) => {
      this.VUELOS_DATA = vuelos;
      this.dataSource = new MatTableDataSource<Vuelo>(this.VUELOS_DATA);
      this.dataSource.sort = this.sort;
    });
  }

  @ViewChild(MatSort) sort!: MatSort;

  createReserva = (vueloID: number) => {
    this.reservasService.createReserva(vueloID).subscribe((data) => {
      console.log('Reserva realizada exitosamente.');
    });
  };
}
