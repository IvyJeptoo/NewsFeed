import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllfeedsComponent } from './components/allfeeds/allfeeds.component';
import { NavbarComponent } from './components/navbar/navbar.component';

const routes: Routes = [
  {path: '', component: AllfeedsComponent},
  {path: 'userFeed', component: NavbarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
