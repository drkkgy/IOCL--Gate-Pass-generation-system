import {Component, ElementRef, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ServerService} from './server.service';
import {stringify} from 'querystring';

@Component({
  selector: 'app-appointmentregistrationcomponent',
  templateUrl: './appointment-registration.component.html',
  styleUrls: ['./appointment-registration.component.css']
})
export class AppointmentRegistrationComponent {
  constructor(private serverService: ServerService) {}
  answer = '';
  status_check = false;
  message_from_server = '';
  @ViewChild('f') signupForm: NgForm;

  user = {
    Name_of_visitor: '',
    Name_of_the_Host: '',
    Visitors_company: '',
    Age: '',
    Visitors_Designation: '',
    Visitors_Address: '',
    Purpose_Of_Visit: ''
  };

  servers = {
      Name_of_visitor: this.user.Name_of_visitor,
      Name_of_the_Host: this.user.Name_of_the_Host,
      Visitors_company: this.user.Visitors_company,
      Age: this.user.Age,
      Visitors_Designation: this.user.Visitors_Designation,
      Visitors_Address: this.user.Visitors_Address,
      Purpose_Of_Visit: this.user.Purpose_Of_Visit

    };

  submitted = false;

  onSave() {
    this.serverService.storeServers(this.user)
      .subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
    console.log(this.servers);
  }




  /* onSubmit(form: NgForm) {
     console.log(form);

   }*/

  onSubmit() {
    this.submitted = true;
    this.user.Name_of_visitor = this.signupForm.value.userData.Name_of_visitor;
    this.user.Name_of_the_Host = this.signupForm.value.userData.Name_of_the_Host;
    this.user.Visitors_company = this.signupForm.value.userData.Visitors_company;
    this.user.Age = this.signupForm.value.userData.Age;
    this.user.Visitors_Designation = this.signupForm.value.userData.Visitors_Designation;
    this.user.Visitors_Address = this.signupForm.value.userData.Visitors_Address;
    this.user.Purpose_Of_Visit = this.signupForm.value.userData.Purpose_Of_Visit;

    this.serverService.storeServers(this.user)
      .subscribe(
        (response) => { this.message_from_server = response.json().message
        if ( this.message_from_server === 'Visitors details registered successfully')
        {
          this.status_check = true
        }

        },
        (error) => console.log(error)
      );
  }
}

