import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './auth/auth.guard';
import {  RouterModule} from '@angular/router';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { SearchFlightsComponent } from './search-flights/search-flights.component';
import { BookFlightComponent } from './book-flight/book-flight.component';
import { RegisterPassengerComponent } from './register-passenger/register-passenger.component';
import { MyBookingsComponent } from './my-bookings/my-bookings.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginPassengerComponent } from './login-passenger/login-passenger.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    SearchFlightsComponent,
    LoginPassengerComponent,
    BookFlightComponent,
    RegisterPassengerComponent,
    MyBookingsComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: SearchFlightsComponent, pathMatch: 'full' },
      { path: 'search-flights', component: SearchFlightsComponent },
      { path: 'book-flight/:flightId', component: BookFlightComponent, canActivate: [AuthGuard] },
      { path: 'register-passenger', component: RegisterPassengerComponent },
      {path:'login-passenger',component:LoginPassengerComponent},
      { path: 'my-booking', component: MyBookingsComponent, canActivate: [AuthGuard]  }

    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }