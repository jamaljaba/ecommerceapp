import { GlobalitemsService } from './../../utility/globalitems.service';
import { Userdatamodel } from './../datamodal/userdatamodel';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  isSignup:any="";
  errormsg:any;

  constructor(
      private formBuilder: FormBuilder,
      private globalitem: GlobalitemsService,
      private router: Router,
      private authenticationService: AuthService
  ) {
      // redirect to home if already logged in
      // if (this.authenticationService.currentUserValue) {
      //     this.router.navigate(['/']);
      // }
  }
  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      fullname: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      password: ['', Validators.required]
  });
  }
      // convenience getter for easy access to form fields
      get f() { return this.signupForm.controls; }

      onSubmit() {
          this.submitted = true;
          // stop here if form is invalid
          if (this.signupForm.invalid) {
              return;
          }
          this.globalitem.showSpinner()
          this.authenticationService.signup(this.f.email.value, this.f.password.value)
        .then((res) => {
           console.log("sign up ",res);
          this.addusertodb()
        }).catch((error) => {
          this.globalitem.hideSpinner()
          this.globalitem.showError(error.message,"Error")
        })
      }

      addusertodb(){
        this.authenticationService.Adduser(this.signupForm.value)
        .then((res) => {
          this.router.navigate(['products']);
          this.globalitem.hideSpinner()
          this.globalitem.showSuccess("You have Successfully  Signup","Success")

       }).catch((error) => {
        this.globalitem.hideSpinner()
         this.globalitem.showError(error.message,"Error")
       })
      }
}
