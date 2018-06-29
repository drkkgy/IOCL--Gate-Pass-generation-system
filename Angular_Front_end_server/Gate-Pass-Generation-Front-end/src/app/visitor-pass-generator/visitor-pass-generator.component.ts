import { Component, OnInit } from '@angular/core';
import {Time} from '@angular/common';
import {Runtime} from 'inspector';

@Component({
  selector: 'app-visitor-pass-generator',
  templateUrl: './visitor-pass-generator.component.html',
  styleUrls: ['./visitor-pass-generator.component.css']
})
export class VisitorPassGeneratorComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }

  print(): void{
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

}
