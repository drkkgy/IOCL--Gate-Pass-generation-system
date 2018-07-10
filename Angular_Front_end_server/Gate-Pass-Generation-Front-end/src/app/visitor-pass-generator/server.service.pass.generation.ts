import { Injectable } from '@angular/core';
import {Headers, Http} from '@angular/http';

@Injectable()

export class  ServerServicePassGeneration {
  constructor(private http: Http) {}


  Mark_Generation_True(server){
    const headers = new Headers({'Content-Type': 'application/json',});
    return this.http.post('http://127.0.0.1:3000/Visitors_Gate_Pass_Generation/Gate_Pass_Generation_Engine/Mark_after_Generation', server,
      {headers: headers});
  }
  Visitor_Image_Upload(server){
    const headers = new Headers({'Content-Type': 'application/json',});
    return this.http.post('http://127.0.0.1:3000/Visitors_Image_Upload/Visitor_Image_upload', server,
      {headers: headers});
  }
}
