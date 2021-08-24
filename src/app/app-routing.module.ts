import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchFlightsComponent } from './search-flights/search-flights.component';
import { YourReservationsComponent } from './your-reservations/your-reservations.component';

export const routes: Routes = [  { path: '', component: SearchFlightsComponent },
// { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
{ path: 'search', component: SearchFlightsComponent },
{ path: 'reservations', component: YourReservationsComponent }
];

@NgModule({
imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
