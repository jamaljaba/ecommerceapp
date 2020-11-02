import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { GlobalitemsService } from 'src/app/utility/globalitems.service';
import { AuthService } from '../service/auth.service';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private globalitem: GlobalitemsService,
    public router: Router,
    private authenticationService: AuthService
      // private authenticationService: AuthenticationService
  ) {

      // redirect to home if already logged in
      if (this.authenticationService.isLoggedIn) {
          this.router.navigate(['products']);
      }
  }
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
  });
  }
      // convenience getter for easy access to form fields
      get f() { return this.loginForm.controls; }

      login() {
      this.submitted = true;
      // stop here if form is invalid
      if (this.loginForm.invalid) {
          return;
      }

      console.log("sign in");

      this.globalitem.showSpinner()
      this.authenticationService.login(this.f.username.value, this.f.password.value)
        .then((res) => {

          this.globalitem.showSuccess("You have Successfully  Login","Success")
          this.globalitem.hideSpinner()
          this.navigateproduct()
        }).catch((error) => {
          this.globalitem.hideSpinner()
          this.globalitem.showError(error.message,"Error")
        })
  }
  navigateproduct(){
    setTimeout(()=>{
      this.router.navigate(['products']);
    console.log("inside login");

    }, 1500);

  }
}
