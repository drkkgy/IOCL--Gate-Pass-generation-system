import { BrowserModule } from '@angular/platform-browser';
import { NgModule , Provider } from '@angular/core';
import { AppComponent } from './app.component';
import { AppointmentRegistrationComponent } from './appointment-registration/appointment-registration.component';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {ServerService} from './appointment-registration/server.service';
// import {BrowserXhr} from '@angular/http';
// import {CustExtBrowserXhr} from './ust-ext-browser-xhr';
// loading the no cors file

@NgModule({
  declarations: [
    AppComponent,
    AppointmentRegistrationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [ServerService,
    // {provide: BrowserXhr, useClass: CustExtBrowserXhr },
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
