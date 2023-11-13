import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Reserva } from 'src/app/interfaces/reserva.interface';

import { ReservasService } from 'src/app/services/reservas.service';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.scss'],
})
export class ReservasComponent {
  RESERVAS_DATA!: Reserva[];

  displayedColumns: string[] = [
    'id',
    'vueloId',
    // 'pasajeroId',
    'createdAt',
    'estado',
    'acciones',
  ];

  dataSource = new MatTableDataSource<Reserva>([]);

  constructor(
    private reservasService: ReservasService,
    private changeDetectorRef: ChangeDetectorRef,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.reservasService.getAllReservas().subscribe({
      next: (reservas) => {
        this.RESERVAS_DATA = reservas;
        this.dataSource = new MatTableDataSource<Reserva>(this.RESERVAS_DATA);
        this.dataSource.sort = this.sort;
      },
    });
  }

  @ViewChild(MatSort) sort!: MatSort;

  deleteReserva = (reservaId: number) => {
    this.reservasService.deleteReserva(reservaId).subscribe({
      complete: () => {
        this.reservasService.getAllReservas().subscribe({
          next: (reservas) => {
            this.RESERVAS_DATA = reservas;
            this.dataSource = new MatTableDataSource<Reserva>(
              this.RESERVAS_DATA
            );
            this.dataSource.sort = this.sort;
          },
          complete: () => {
            this.changeDetectorRef.detectChanges();

            this._snackBar.open('Reserva eliminada exitosamente.', 'Cerrar', {
              duration: 5 * 1000,
            });
          },
        });
      },
    });
  };
}
