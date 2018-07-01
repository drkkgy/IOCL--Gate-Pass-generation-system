import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ServerServiceUserRegistration} from './server.service.user.registration';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  checkBoxValue = false;
  activate_login = false;
  constructor(private serverService: ServerServiceUserRegistration , private router: Router ) { }
  message_from_server = '';
  status_check = false;
  submitted = false;
  @ViewChild('f') signupForm: NgForm;
  Reception_Emp_role = '';
  user = {
    Name_Of_Employee: '',
    Username: '',
    Password: '',
    Reception:  false
  };

  ngOnInit() {
  }

  onSubmit() {
    this.submitted = true;
    this.user.Name_Of_Employee = this.signupForm.value.userData.Name_Of_Employee;
    this.user.Username = this.signupForm.value.userData.Username;
    this.user.Password = this.signupForm.value.userData.Password;
    console.log(this.checkBoxValue , this.user.Reception);
    this.serverService.storeServers(this.user)
      .subscribe(
        (response) => { this.message_from_server = response.json().message;
          if ( this.message_from_server === 'User Registration successfully') {
            this.status_check = true;
            this.activate_login = true;
          }

        },
        (error) => console.log(error)
      );
  }
  toggle_fun(){
    this.checkBoxValue = true;
    this.user.Reception = true;
   }
   route_to_login()
   {
     this.router.navigate(['/Login']);
   }

}
