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
  RESERVAS_DATA!: Reserva[];

  displayedColumns: string[] = [
    'reservaid',
    'vueloid',
    // 'pasajeroid',
    'fechareserva',
    'estado',
    'acciones',
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
      this.dataSource.sort = this.sort;
    });
  }

  @ViewChild(MatSort) sort!: MatSort;

  deleteReserva = (reservaID: number) => {
    this.reservasService.deleteReserva(reservaID).subscribe((data) => {
      console.log('Reserva eliminada exitosamente.');
      this.reservasService.getAllReservas().subscribe((reservas) => {
        this.RESERVAS_DATA = reservas;
        this.dataSource = new MatTableDataSource<Reserva>(this.RESERVAS_DATA);
        this.dataSource.sort = this.sort;
        this.changeDetectorRef.detectChanges();
      });
    });
  };
}
