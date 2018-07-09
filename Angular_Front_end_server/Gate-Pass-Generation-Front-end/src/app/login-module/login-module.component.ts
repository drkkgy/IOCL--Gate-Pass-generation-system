import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {ServerServiceUserRegistration} from '../user-register/server.service.user.registration';
import {ServerServiceLogin} from './server.service.login';

@Component({
  selector: 'app-login-module',
  templateUrl: './login-module.component.html',
  styleUrls: ['./login-module.component.css']
})
export class LoginModuleComponent implements OnInit {

  @ViewChild('f') signupForm: NgForm;
   sucess = false;
  user = {
    Username: '',
    Password: '',
  };
  submitted = false;
  Reception = false;
  constructor(private serverService: ServerServiceLogin , private router: Router ) { }

  ngOnInit() {
  }

  route_to_register() {
    this.router.navigate(['/register_user']);
  }

  onSubmit() {
    this.submitted = true;
    this.user.Username = this.signupForm.value.userData.Username;
    this.user.Password = this.signupForm.value.userData.Password;
    this.serverService.storeServers(this.user)
      .subscribe(
        (response) => { console.log(response)
          if (response.json().code === 200) {
            this.sucess = true ;
            this.Reception = response.json().Reception;
            /*if(response.json().Reception === 'True'){
              this.Reception = true ;
            } else{
              this.Reception = false ;
            }*/
          } else{
            this.sucess = false ;
          }
        },
        (error) => console.log(error)
      );
     console.log(this.Reception);
     setTimeout( () => {
     if(this.sucess) {
       if (this.Reception) {
           this.router.navigate(['/appointment-display']);
         } else{
         this.router.navigate(['/appointment-registration']);
         }
         } else {
       } } , 4000
       );
       }

}
