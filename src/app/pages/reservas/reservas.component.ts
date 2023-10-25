import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Reserva } from 'src/app/interfaces/reservas.interface';
import { ReservasService } from 'src/app/services/reservas.service';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.scss'],
})
export class ReservasComponent {
  RESERVAS_DATA: Reserva[] = [
    {
      ReservaID: 99,
      VueloID: 1,
      PasajeroID: 1,
      FechaReserva: '2023-12-31T23:30:00.000Z',
      Estado: 'Completada',
    },
  ];

  displayedColumns: string[] = [
    'ReservaID',
    'VueloID',
    // 'PasajeroID',
    'FechaReserva',
    'Estado',
    'Acciones',
  ];

  dataSource = new MatTableDataSource<Reserva>([]);

  constructor(
    private reservasService: ReservasService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.reservasService.getAllReservas().subscribe((reservas) => {
      this.RESERVAS_DATA = reservas;
      this.dataSource = new MatTableDataSource<Reserva>(this.RESERVAS_DATA);
    });
  }

  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  deleteReserva = (reservaID: number) => {
    this.reservasService.deleteReserva(reservaID).subscribe((data) => {
      console.log('Reserva eliminada exitosamente.');
      this.reservasService.getAllReservas().subscribe((reservas) => {
        this.RESERVAS_DATA = reservas;
        this.dataSource = new MatTableDataSource<Reserva>(this.RESERVAS_DATA);
        this.changeDetectorRef.detectChanges();
      });
    });
  };
}
