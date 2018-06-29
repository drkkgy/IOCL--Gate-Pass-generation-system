import { Component, OnInit } from '@angular/core';
import {error} from 'util';
import {ServerServiceAppointmentDisplay} from './server.service.appointment.display';
import {stringify} from 'querystring';
import {count} from 'rxjs/operators';
import {range} from 'rxjs';
import set = Reflect.set;

@Component({
  selector: 'app-appointment-display',
  templateUrl: './appointment-display.component.html',
  styleUrls: ['./appointment-display.component.css']
})
export class AppointmentDisplayComponent implements OnInit {
  submitted1 = false;
  status_check1 = true;
  servers = [];
  condition = true;
  constructor(private serverService: ServerServiceAppointmentDisplay) {}
  searchData = '';
  ngOnInit() {
  }

  onGet() {
    this.submitted1 = true;
    this.serverService.getServers()
      .subscribe(
        // (response) => this.intermediate_value = (response.result[0].Name_of_visitor + ' Invited by ' + response.result[0].Name_of_the_Host),
        (response) => {console.log(this.servers);
        if ( response.json().message === 'Appointment registration failed try again')
        {
          this.status_check1 = false
        }
        this.servers = [];
        for (let i in response.json().result) {
          this.servers.push(response.json().result[i].Name_of_visitor + ' Is Invited by ' +  response.json().result[i].Name_of_the_Host
          + ' on ' + response.json().result[i].Time); }},
        (error) => console.log(error)
      );
  }
  onSearch() {
    this.serverService.searchServer()
      .subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
  }

  onUpdateServerName(event: Event) {
    this.searchData = (<HTMLInputElement>event.target).value;
  }
}
