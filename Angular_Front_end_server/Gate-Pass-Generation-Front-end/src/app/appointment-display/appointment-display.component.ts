import {Component, Input, OnInit, Output} from '@angular/core';
import {error} from 'util';
import {ServerServiceAppointmentDisplay} from './server.service.appointment.display';
import {Router} from '@angular/router';
import {Mainservice} from '../mainservice';
@Component({
  selector: 'app-appointment-display',
  templateUrl: './appointment-display.component.html',
  styleUrls: ['./appointment-display.component.css']
})
export class AppointmentDisplayComponent implements OnInit {
  status_check2 = false;
  arr = [];
  submitted1 = false;
  status_check1 = true;
  servers = [];
  condition = true;
  dict = {};
  timeDict = {};
  // *****************************************************************
  VisitorName = '  default';
  HostName = '  default';
  VisitorsCompany = '  default';
  VisitorsAge = '  default';
  VisitorsDesignation = '  default';
  VisitorsAddress = '  default';
  PurposeOfVisit = '  default';
  TimeOfGeneration = '  default';
  GeneratedOn = 'default';
  genstat = false;
  temparr = [];
  errCatcher = '';
  // ******************************************************************
  constructor(private serverService: ServerServiceAppointmentDisplay, private router: Router, private Mservice: Mainservice) {
  }

  searchData = '';

  ngOnInit() {
  }

  onGet() {
    this.submitted1 = true;
    this.status_check2 = false;
    this.serverService.getServers()
      .subscribe(
        (response) => {
          if (response.json().message === 'Appointment registration failed try again') {
            this.status_check1 = false;
          }
          this.servers = [];
          for (let i in response.json().result) {
            this.servers.push(response.json().result[i].Name_of_visitor + ' Is Invited by ' + response.json().result[i].Name_of_the_Host
              + ' on ' + response.json().result[i].Time_Stamp);
          }
          console.log(this.servers);
        },
        (error) => console.log(error)
      );
  }

  onSearch() {
    this.submitted1 = true;
    console.log(this.dict)
    this.serverService.searchServer(this.dict)
      .subscribe(
        (response) => {
          console.log(this.servers);
          console.log(response.json().result)
          if (response.json().code === 200) {
            this.status_check1 = true;
          } else {
            this.status_check1 = false;
          }
          if (response.json().result.length === 0) {
            this.status_check2 = true;
          } else {
            this.status_check2 = false;
          }
          this.servers = [];
          if (this.dict['Attended_Status']) {
            this.condition = true;
            for (let i in response.json().result) {
              this.servers.push(response.json().result[i].Name_of_visitor + ' Is Invited by ' + response.json().result[i].Name_of_the_Host
                + ' on ' + response.json().result[i].Time_Stamp);
            }
          } else {
            this.condition = false;
            for (let i in response.json().result) {
              this.servers.push('Pass for ' + response.json().result[i].Name_of_visitor
                + ' Is Invited by ' + response.json().result[i].Name_of_the_Host
                + ' on ' + response.json().result[i].Time_Stamp + ' Generated on ' + response.json().result[i].Pass_Generated_On);
            }
          }
        },
        (error) => console.log(error)
      );
  }

  onUpdateServerName(event: Event) {
    this.searchData = (<HTMLInputElement>event.target).value;
    this.arr = this.searchData.split(',');
    if(this.arr[2] === 'true') {
      this.arr[2] = true;
    } else {
      this.arr[2] = false;
    }
    this.dict = {'Tim': this.arr[0], 'Name_of_visitor': this.arr[1], 'Attended_Status': this.arr[2]};
  }

  Fetch_time_stamp(time) {
    if (time.length < 60) {
    this.timeDict = {'Time_Stamp': time.slice(-16)};
    } else{
        this.timeDict = {'Time_Stamp': time.slice(-16)};
    }
  }
  Fetch_Pass_Data(temparr: any) {
    this.serverService.Fetch_Visitor_data(this.timeDict)
      .subscribe(
        (response) => {
          console.log(response.json());
          if (response.json().code === 404) {
            this.errCatcher = response.json().message;
            console.log(this.errCatcher);
            console.log(this.timeDict['Time_Stamp']);
          } else {
            this.VisitorName = response.json().result.Name_of_visitor;
            this.HostName = response.json().result.Name_of_the_Host;
            this.VisitorsCompany = response.json().result.Visitors_company;
            this.VisitorsAge = response.json().result.Age;
            this.VisitorsDesignation = response.json().result.Visitors_Designation;
            this.VisitorsAddress = response.json().result.Visitors_Address;
            this.PurposeOfVisit = response.json().result.Purpose_Of_Visit;
            this.TimeOfGeneration = response.json().result.Time_Stamp;
          }
          this.temparr = [this.VisitorName , this.HostName , this.VisitorsCompany, this.VisitorsAge ,
           this.VisitorsDesignation , this.VisitorsAddress , this.PurposeOfVisit , this.TimeOfGeneration ,
            this.timeDict , this.errCatcher, this.condition, response.json().result.Pass_Generated_On , {'Name_of_visitor': this.VisitorName
          , 'Time_Stamp': this.TimeOfGeneration, 'File_Name': this.VisitorName} ];
          this.Mservice.TrasferData.emit(this.temparr);
        },
        (error) => console.log(error)
      );
    setTimeout(() => {this.router.navigate(['/visitor-pass-generation']); } , 10);
    }
  onGetGen() {
    this.submitted1 = true;
    this.status_check2 = false;
    this.condition = false;
    this.serverService.getServers_gen()
      .subscribe(
        (response) => {
          if ( response.json().message === 'Appointment registration failed try again') {
            this.status_check1 = false;
          }
          this.servers = [];
          for (let i in response.json().result) {this.servers.push('Pass for ' + response.json().result[i].Name_of_visitor +
            ' Generated on ' + response.json().result[i].Pass_Generated_On + ' Invited by ' +  response.json().result[i].Name_of_the_Host
              + ' on ' + response.json().result[i].Time_Stamp); }
          console.log(this.servers);},
        (error) => console.log(error)
      );
  }
  route_to_login() {
    this.router.navigate(['/Login']);
  }
}
