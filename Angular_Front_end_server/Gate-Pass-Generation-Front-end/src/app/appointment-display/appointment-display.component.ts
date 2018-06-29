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
  status_check2 = false;
  submitted1 = false;
  status_check1 = true;
  servers = [];
  condition = true;
  dict ={};
  constructor(private serverService: ServerServiceAppointmentDisplay) {}
  searchData = '';
  ngOnInit() {
  }

  onGet() {
    this.submitted1 = true;
    this.status_check2 = false;
    this.serverService.getServers()
      .subscribe(
        (response) => {console.log(this.servers);
        if ( response.json().message === 'Appointment registration failed try again') {
          this.status_check1 = false;
        }
        this.servers = [];
        for (let i in response.json().result) {
          this.servers.push(response.json().result[i].Name_of_visitor + ' Is Invited by ' +  response.json().result[i].Name_of_the_Host
          + ' on ' + response.json().result[i].Time); }},
        (error) => console.log(error)
      );
  }
  onSearch() {
    this.submitted1 = true;
    this.serverService.searchServer(this.dict)
      .subscribe(
        (response) => {console.log(this.servers);
         console.log(response.json().code)
          if ( response.json().code === 200 ) {
            this.status_check1 = true;
          } else {
            this.status_check1 = false;
          }
          if (response.json().result.length === 0)
          {
            this.status_check2 = true;
          }else {
           this.status_check2 = false;
          }
          this.servers = [];
          for (let i in response.json().result) {
            this.servers.push(response.json().result[i].Name_of_visitor + ' Is Invited by ' +  response.json().result[i].Name_of_the_Host
              + ' on ' + response.json().result[i].Time); }},
        (error) => console.log(error)
      );
  }

  onUpdateServerName(event: Event) {
    this.searchData = (<HTMLInputElement>event.target).value;
    this.dict = {'Tim' : this.searchData};
  }
}
