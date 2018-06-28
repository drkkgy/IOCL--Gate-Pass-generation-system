import { Injectable } from '@angular/core';
import {Headers, Http} from '@angular/http';

@Injectable()

export class  ServerService {
  constructor(private http: Http) {}

  storeServers(servers: any[]) {
    const headers = new Headers({'Content-Type': 'application/json',});
    return this.http.post('http://127.0.0.1:3000/Visitors_Details_Registeration/uploading_request', servers,
      {headers: headers});

  }

  /*getServers() {
    return this.http.get('https://udenmy-ng-http.firebaseio.com/data.json/1');
  }*/
}
