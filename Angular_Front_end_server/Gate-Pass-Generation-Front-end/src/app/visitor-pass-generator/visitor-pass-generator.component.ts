import { Component, OnInit } from '@angular/core';
import {ServerServicePassGeneration} from './server.service.pass.generation';
import {DatePipe, getLocaleDateTimeFormat} from '@angular/common';
import {stringify} from 'querystring';


@Component({
  selector: 'app-visitor-pass-generator',
  templateUrl: './visitor-pass-generator.component.html',
  styleUrls: ['./visitor-pass-generator.component.css']
})
export class VisitorPassGeneratorComponent implements OnInit {
  constructor(private serverService: ServerServicePassGeneration) {
  }
  current_time = new Date();
  get_current_date = ['00', '00' , '0000' , '00' , '00' , '00' ];
  isGenerated = false;
  VisitorName = '  default';
  HostName = '  default';
  VisitorsCompany = '  default';
  VisitorsAge = '  default';
  VisitorsDesignation = '  default';
  VisitorsAddress = '  default';
  PurposeOfVisit = '  default';
  TimeOfGeneration = '  default';
  timeDict = {};

  ngOnInit() {
  }

// Print Function to invoke system call
  print(): void {
    let printContents, popupWin;
    printContents = document.getElementById('print-section').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Print tab</title>
          <style>
          //........Customized style.......
          </style>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
  }

  Fetch_Pass_Data() {
    this.serverService.Fetch_Visitor_data(this.timeDict)
      .subscribe(
        (response) => {
            this.VisitorName = response.json().result.Name_of_visitor;
            this.HostName = response.json().result.Name_of_the_Host;
            this.VisitorsCompany = response.json().result.Visitors_company;
            this.VisitorsAge = response.json().result.Age;
            this.VisitorsDesignation = response.json().result.Visitors_Designation;
            this.VisitorsAddress = response.json().result.Visitors_Address;
            this.PurposeOfVisit = response.json().result.Purpose_Of_Visit;
            this.TimeOfGeneration =  response.json().result.Time_Stamp;
        },
        (error) => console.log(error)
      );
  }

  Mark_Generated_File() {
    this.isGenerated = true;
    // --------Generating Time Stamp---------------------------
    this.get_current_date[0] = this.current_time.getDate().toString();
    this.get_current_date[1] = this.current_time.getMonth().toString();
    this.get_current_date[2] = this.current_time.getFullYear().toString();
    this.get_current_date[3] = this.current_time.getHours().toString();
    this.get_current_date[4] = this.current_time.getMinutes().toString();
    this.get_current_date[5] = this.current_time.getSeconds().toString();
    // ---------------------------------------------------------
    this.serverService.Mark_Generation_True(this.timeDict)
      .subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
  }
  Fetch_time_stamp(time) {
    this.timeDict = {'Time_Stamp': time};
 }

}
