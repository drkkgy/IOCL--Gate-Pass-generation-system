import { Injectable } from '@angular/core';
import {Headers, Http} from '@angular/http';

@Injectable()

export class  ServerServiceAppointmentDisplay {
  constructor(private http: Http) {}
  getServers() {
    return this.http.get('http://127.0.0.1:3000/Visitors_List_Display/Visitors_Appointment_Display');
  }
  searchServer(servers) {
    const headers = new Headers({'Content-Type': 'application/json', });
    return this.http.post('http://127.0.0.1:3000/Visitors_List_Display/Search_appointment', servers,
      {headers: headers});
    }
}
