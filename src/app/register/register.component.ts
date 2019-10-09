import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
// array in local storage for registered users
let users = JSON.parse(localStorage.getItem('smartvillageusers')) || [];


import { AlertService, UserService, AuthenticationService } from '../_services';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})

export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private alertService: AlertService
  ) {
    // redirect to home if already logged in
    debugger
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      phonenumber: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  // convenience getter for easy access to form fields

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    debugger;
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.userService.register(this.registerForm.value)
      //  .pipe(first())
      .subscribe(
        data => {
          this.registerForm.value.id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;
          users.push(this.registerForm.value);
          localStorage.setItem('smartvillageusers', JSON.stringify(users));
          this.alertService.success('Registration successful', true);
          this.router.navigate(['/home']);
        },
        error => {
          debugger
          this.alertService.error(error);
          this.loading = false;
        });
  }
}
