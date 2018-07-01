import { BrowserModule } from '@angular/platform-browser';
import { NgModule , Provider } from '@angular/core';
import { AppComponent } from './app.component';
import { AppointmentRegistrationComponent } from './appointment-registration/appointment-registration.component';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {ServerService} from './appointment-registration/server.service';
import { AppointmentDisplayComponent } from './appointment-display/appointment-display.component';
import {ServerServiceAppointmentDisplay} from './appointment-display/server.service.appointment.display';
import {VisitorPassGeneratorComponent} from './visitor-pass-generator/visitor-pass-generator.component';
import {ServerServicePassGeneration} from './visitor-pass-generator/server.service.pass.generation';
import {RouterModule, Routes} from '@angular/router';
import { LoginModuleComponent } from './login-module/login-module.component';
import {Mainservice} from './mainservice';
import { UserRegisterComponent } from './user-register/user-register.component';
import {ServerServiceUserRegistration} from './user-register/server.service.user.registration';
// import {BrowserXhr} from '@angular/http';
// import {CustExtBrowserXhr} from './ust-ext-browser-xhr';
// loading the no cors file
const appRoutes: Routes = [
  {path: '' , component: LoginModuleComponent },
  {path: 'appointment-display', component: AppointmentDisplayComponent},
  {path: 'appointment-registration', component: AppointmentRegistrationComponent},
  {path: 'visitor-pass-generation', component: VisitorPassGeneratorComponent},
  {path: 'Login', component: LoginModuleComponent},
  {path: 'register_user', component: UserRegisterComponent}
];
@NgModule({
  declarations: [
    AppComponent,
    AppointmentRegistrationComponent,
    AppointmentDisplayComponent,
    VisitorPassGeneratorComponent,
    LoginModuleComponent,
    UserRegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ServerService, ServerServiceAppointmentDisplay, ServerServicePassGeneration , Mainservice
    // {provide: BrowserXhr, useClass: CustExtBrowserXhr },
    , ServerServiceUserRegistration],
  bootstrap: [AppComponent]
})
export class AppModule { }
