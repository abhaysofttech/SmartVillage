import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService, AdminService } from 'src/app/_services';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-state-register',
  templateUrl: './state-register.component.html',
  styleUrls: ['../registerLayout.scss'],
})
export class StateRegisterComponent implements OnInit {
  stateregisterForm: FormGroup;
  stateList:any;
  constructor(
    private alertService: AlertService,
    private adminService: AdminService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit() {
    debugger
    this.stateregisterForm = this.formBuilder.group({
      statename: ['', Validators.required],
      statenameHindi: ['', Validators.required],
      statenameMarathi: ['', Validators.required]
    });
    this.getAllState();
  }

  get f() {
    return this.stateregisterForm.controls;
  }

  getAllState() {
    debugger
    this.adminService.getAllStates()
       .pipe(first())
      .subscribe(
        data => {
         this.stateList = data;
        },
        error => {
          debugger
          this.alertService.error(error);
        //  this.loading = false;
        });
  }
  onSubmit() {
    debugger
    // stop here if form is invalid
    if (this.stateregisterForm.invalid) {
      return;
    }

  ;
    this.adminService.registerState(this.stateregisterForm.value)
      //  .pipe(first())
      .subscribe(
        data => {
          // this.stateregisterForm.value.id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;
          // users.push(this.stateregisterForm.value);
          // localStorage.setItem('smartvillageusers', JSON.stringify(users));
          this.alertService.success('State Registration successful', true);
         this.router.navigate(['/admin/dashboard']);
        },
        error => {
          this.alertService.error(['State Registration Fail', '', error]);

        //  this.loading = false;
        });
  }
}
