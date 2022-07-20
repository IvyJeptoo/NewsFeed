import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllfeedsComponent } from './components/allfeeds/allfeeds.component';
import { UserfeedsComponent } from './components/userfeeds/userfeeds.component';

const routes: Routes = [
  {path: '', component: AllfeedsComponent},
  {path: 'userFeed', component: UserfeedsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
