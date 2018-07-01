import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';

@Injectable()

export class  ServerServiceUserRegistration{
  constructor(private http: Http) {}

  storeServers(servers) {
    const headers = new Headers({'Content-Type': 'application/json', });
    return this.http.post('http://127.0.0.1:3000/Login/crete_account', servers,
      {headers: headers});

  }
}
