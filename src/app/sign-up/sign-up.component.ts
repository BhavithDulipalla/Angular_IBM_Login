import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

  showStates : boolean = true;

  states : any = {
    india : ['Telangana', 'AndhraPradesh', 'Tamilnadu', 'Karnataka'],
    USA : ["Missouri","Texas","Florida","New York","California"]
  }
  countries = Object.keys(this.states);

  signUpForm = new FormGroup({
    businessEmail : new FormControl('',[Validators.required, Validators.email]),
    password : new FormControl('',Validators.required),
    firstName : new FormControl('',Validators.required),
    lastName : new FormControl('',Validators.required),
    country : new FormControl('',Validators.required),
    state : new FormControl('',Validators.required),
    studentStatus : new FormControl('',Validators.required)
  });

  localValues : any;
  localArray : any[] = [];

  emailWarning : string = '';
  passwordWarning : string = '';
  firstNameWarning : string = '';
  lastNameWarning : string = '';
  countryWarning : string = '';
  stateWarning : string = '';
  studentStatusWarning : string = '';

  validateEmail(){
    this.signUpForm.value.businessEmail === "" ? this.emailWarning = 'Email is required' : this.emailWarning = '';
  }
  validatePassword(){
    this.signUpForm.value.password === "" ? this.passwordWarning = 'Password is required' : this.passwordWarning = '';
  }
  validateFirstName(){
    this.signUpForm.value.firstName === "" ? this.firstNameWarning = 'First name is required' : this.firstNameWarning = '';
  }
  validateLastName(){
    this.signUpForm.value.lastName === "" ? this.lastNameWarning = 'Last name is required' : this.lastNameWarning = '';
  }
  validateCountry(){
    this.signUpForm.value.country === "" ? this.countryWarning = 'Please select a country' : this.countryWarning = '';
    this.showStates = this.signUpForm.value.country === ""
  }
  validateState(){
    this.signUpForm.value.state === "" ? this.stateWarning = 'Please select a state' : this.stateWarning = '';
  }

  handleSubmit(){
    if(!this.signUpForm.valid){
      this.signUpForm.value.businessEmail === "" ? this.emailWarning = 'Email is required' : this.emailWarning = '';
      this.signUpForm.value.password === "" ? this.passwordWarning = 'Password is required' : this.passwordWarning = '';
      this.signUpForm.value.firstName === "" ? this.firstNameWarning = 'First name is required' : this.firstNameWarning = '';
      this.signUpForm.value.lastName === "" ? this.lastNameWarning = 'Last name is required' : this.lastNameWarning = '';
      this.signUpForm.value.country === "" ? this.countryWarning = 'Please select a country' : this.countryWarning = '';
      this.signUpForm.value.state === "" ? this.stateWarning = 'Please select a state' : this.stateWarning = '';
      this.signUpForm.value.studentStatus === "" ? this.studentStatusWarning = 'Select one' : this.studentStatusWarning = '';
    }
    else{
      this.localValues = localStorage.getItem('signUpFormValues');
      if(this.localValues){
        this.localArray  = JSON.parse(this.localValues);
        this.localArray.push(this.signUpForm.value)
      }
      else{
        this.localArray.push(this.signUpForm.value);
        localStorage.setItem('signUpFormValues', JSON.stringify(this.localArray));
      }
    }
  }

}
