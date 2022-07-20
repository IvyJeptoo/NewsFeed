import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { AllfeedsComponent } from './components/allfeeds/allfeeds.component';
import { UserfeedsComponent } from './components/userfeeds/userfeeds.component';
import { LikefeedComponent } from './components/likefeed/likefeed.component';
import { PostfeedComponent } from './components/postfeed/postfeed.component';
import { FollowComponent } from './components/follow/follow.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    AllfeedsComponent,    
    UserfeedsComponent,
    LikefeedComponent,
    PostfeedComponent,
    FollowComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
