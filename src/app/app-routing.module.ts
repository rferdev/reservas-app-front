import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { VuelosComponent } from './pages/vuelos/vuelos.component';
import { ReservasComponent } from './pages/reservas/reservas.component';
import { HomeComponent } from './pages/home/home.component';

// test 2

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: HomeComponent },
  { path: 'vuelos', component: VuelosComponent },
  { path: 'reservas', component: ReservasComponent },
  { path: '**', redirectTo: 'dashboard' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
