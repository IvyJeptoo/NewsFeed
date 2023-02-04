import {  NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AllfeedsComponent } from './allfeeds/allfeeds.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: AllfeedsComponent
  },
  {
    path: 'user-feed',
    component: NavbarComponent
  }
]


@NgModule({
  declarations: [
    AllfeedsComponent,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    FormsModule
  ]
})
export class FeedsModule { }
