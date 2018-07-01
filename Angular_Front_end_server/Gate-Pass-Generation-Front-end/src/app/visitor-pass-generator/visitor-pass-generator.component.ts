import {Component, Input, OnInit} from '@angular/core';
import {ServerServicePassGeneration} from './server.service.pass.generation';
import {Router} from '@angular/router';
import {Mainservice} from '../mainservice';


@Component({
  selector: 'app-visitor-pass-generator',
  templateUrl: './visitor-pass-generator.component.html',
  styleUrls: ['./visitor-pass-generator.component.css']
})
export class VisitorPassGeneratorComponent implements OnInit {
  constructor(private serverService: ServerServicePassGeneration, private router: Router , private Mservice: Mainservice) {
    this.Mservice.TrasferData.subscribe(
      (temparr: any) => {

        this.VisitorName = temparr[0];
        this.HostName = temparr[1];
        this.VisitorsCompany = temparr[2];
        this.VisitorsAge = temparr[3];
        this.VisitorsDesignation = temparr[4];
        this.VisitorsAddress = temparr[5];
        this.PurposeOfVisit = temparr[6];
        this.TimeOfGeneration = temparr[7];
        this.timeDict = temparr[8];
        this.message = temparr[9];
        this.condition_checker = temparr[10];
        this.generaation_time = temparr[11];
        this.isGenerated = !(this.condition_checker);
        console.log(this.condition_checker);
      }
    );
    if (this.message === 'No appointment at this point in time') {
      this.status_check_sys = false ;
    }
    console.log(this.message);
  }
  // --------------
  status_check_sys = true;
  current_time = new Date();
  get_current_date = ['00', '00' , '0000' , '00' , '00' , '00' ];
  isGenerated = false;
  VisitorName = 'default';
  HostName = '  default';
  VisitorsCompany = '  default';
  VisitorsAge = '  default';
  VisitorsDesignation = '  default';
  VisitorsAddress = '  default';
  PurposeOfVisit = '  default';
  TimeOfGeneration = '  default';
  timeDict = {};
  message = '';
  condition_checker = true;
  generaation_time = '';
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

  public Mark_Generated_File() {
    this.isGenerated = true;
    // --------Generating Time Stamp---------------------------
    this.current_time = new Date();
    this.get_current_date[0] = this.current_time.getDate().toString();
    this.get_current_date[1] = this.current_time.getMonth().toString();
    this.get_current_date[2] = this.current_time.getFullYear().toString();
    this.get_current_date[3] = this.current_time.getHours().toString();
    this.get_current_date[4] = this.current_time.getMinutes().toString();
    this.get_current_date[5] = this.current_time.getSeconds().toString();
    // --------------------modifying the timedict variable for the modified changes-----
    this.timeDict['Pass_Generated_On'] = this.get_current_date[0] + '/' + this.get_current_date[1]
      + '/' + this.get_current_date[2] + '/' + this.get_current_date[3] + ':' + this.get_current_date[4]
      + ':' + this.get_current_date[5];
    // ----------------------------------------------------------------------------------
    this.serverService.Mark_Generation_True(this.timeDict)
      .subscribe(
        (response) => {console.log(response);
        if (response.json().status === 200) {
          this.status_check_sys = true;
        } else {
          this.status_check_sys = false;
        }},
        (error) => console.log(error)
      );

  }
}
