import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { VuelosService } from 'src/app/services/vuelos.service';
import { Vuelo } from 'src/app/interfaces/vuelos.interface';

@Component({
  selector: 'app-vuelos',
  templateUrl: './vuelos.component.html',
  styleUrls: ['./vuelos.component.scss'],
})
export class VuelosComponent implements OnInit, AfterViewInit {
  VUELOS_DATA: Vuelo[] = [
    {
      VueloID: 99,
      Codigo: 'codigo',
      Origen: 'origen',
      Destino: 'destino',
      Salida: '2023-12-31T23:30:00.000Z',
      Llegada: '2024-01-01T00:30:00.000Z',
      Capacidad: 1,
    },
  ];

  displayedColumns: string[] = [
    'VueloID',
    'Codigo',
    'Origen',
    'Destino',
    'Salida',
    'Llegada',
    'Capacidad',
  ];

  dataSource = new MatTableDataSource<Vuelo>([]);

  constructor(private vuelosService: VuelosService) {}

  ngOnInit(): void {
    this.vuelosService.getVuelos().subscribe((vuelos) => {
      this.VUELOS_DATA = vuelos;
      this.dataSource = new MatTableDataSource<Vuelo>(this.VUELOS_DATA); // Update the MatTableDataSource
    });
  }

  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
}
