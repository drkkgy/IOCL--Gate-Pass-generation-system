import {EventEmitter, Injectable, } from '@angular/core';


@Injectable()
export class Mainservice {

  TrasferData = new EventEmitter<any>();

}
