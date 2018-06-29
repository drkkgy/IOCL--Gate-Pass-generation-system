import { Component, OnInit } from '@angular/core';
import {Runtime} from 'inspector';
import {ServerServicePassGeneration} from './server.service.pass.generation';
import {error} from 'util';

@Component({
  selector: 'app-visitor-pass-generator',
  templateUrl: './visitor-pass-generator.component.html',
  styleUrls: ['./visitor-pass-generator.component.css']
})
export class VisitorPassGeneratorComponent implements OnInit {
  constructor(private serverService: ServerServicePassGeneration) {
  }
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
    this.serverService.Mark_Generation_True(this.timeDict)
      .subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
  }
  Fetch_time_stamp(time){
    this.timeDict = {'Time_Stamp': time};
 }
}
