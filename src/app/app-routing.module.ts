import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { VuelosComponent } from './pages/vuelos/vuelos.component';
import { ReservasComponent } from './pages/reservas/reservas.component';

const routes: Routes = [
  { path: 'vuelos', component: VuelosComponent },
  { path: 'reservas', component: ReservasComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
