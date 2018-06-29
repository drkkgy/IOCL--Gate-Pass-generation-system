import { BrowserModule } from '@angular/platform-browser';
import { NgModule , Provider } from '@angular/core';
import { AppComponent } from './app.component';
import { AppointmentRegistrationComponent } from './appointment-registration/appointment-registration.component';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {ServerService} from './appointment-registration/server.service';
import { AppointmentDisplayComponent } from './appointment-display/appointment-display.component';
import {ServerServiceAppointmentDisplay} from './appointment-display/server.service.appointment.display';
// import {BrowserXhr} from '@angular/http';
// import {CustExtBrowserXhr} from './ust-ext-browser-xhr';
// loading the no cors file

@NgModule({
  declarations: [
    AppComponent,
    AppointmentRegistrationComponent,
    AppointmentDisplayComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [ServerService, ServerServiceAppointmentDisplay
    // {provide: BrowserXhr, useClass: CustExtBrowserXhr },
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
