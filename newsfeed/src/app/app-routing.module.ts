import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllfeedsComponent } from './feeds/allfeeds/allfeeds.component';
import { NavbarComponent } from './feeds/navbar/navbar.component';

const routes: Routes = [
  {path: '', component: AllfeedsComponent},
  {path: 'userFeed', component: NavbarComponent}
];

const appRoutes: Routes = [
  {
    path: '',
    loadChildren: () => import ('./feeds/feeds.module').then(M => M.FeedsModule)
  }
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
