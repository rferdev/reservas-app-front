import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Vuelo } from 'src/app/interfaces/vuelo.interface';

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
    // 'id',
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
    private reservasService: ReservasService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.vuelosService.getAllVuelos().subscribe({
      next: (vuelos) => {
        this.VUELOS_DATA = vuelos;
        this.dataSource = new MatTableDataSource<Vuelo>(this.VUELOS_DATA);
        this.dataSource.sort = this.sort;
      },
    });
  }

  @ViewChild(MatSort) sort!: MatSort;

  createReserva = (vueloId: number) => {
    this.reservasService.createReserva(vueloId).subscribe({
      complete: () => {
        this._snackBar.open('Reserva realizada exitosamente.', 'Cerrar', {
          duration: 5 * 1000,
        });
      },
    });
  };
}
