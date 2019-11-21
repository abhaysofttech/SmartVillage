import { Component, OnInit } from '@angular/core';
import { AlertService, AdminService } from 'src/app/_services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-division-register',
  templateUrl: './division-register.component.html',
  styleUrls: ['../registerLayout.scss'],
})
export class DivisionRegisterComponent implements OnInit {
  divisionregisterForm: FormGroup;
  stateList: any;
  divisionList: any;
  constructor(
    private alertService: AlertService,
    private adminService: AdminService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit() {
    this.divisionregisterForm = this.formBuilder.group({
      statename: ['', Validators.required],
      divisionname: ['', Validators.required],
      divisionnameHindi: ['', Validators.required],
      divisionnameMarathi: ['', Validators.required],
    });
    this.adminService.getAllStates()
      //  .pipe(first())
      .subscribe(
        data => {
          this.stateList = data;
          this.changeState(this.stateList[0].statename);

        },
        error => {
          debugger
          this.alertService.error(error);
          //  this.loading = false;
        });

  }
  get f() {
    return this.divisionregisterForm.controls;
  }
  changeState(statename) {
    // this.cities = this.countryList.find(con => con.name == count).cities;
    console.log(statename);
    this.adminService.getAllDivision(statename)
      .subscribe(
        data => {
          this.divisionList = data;
          console.log(data);

        },
        error => {
          console.log(error);

        });
  }
  getAllState() {
    debugger
    this.adminService.getAllStates()
      //  .pipe(first())
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
  getDivisionByState(params) {
    debugger
    this.adminService.getAllStates()
      //  .pipe(first())
      .subscribe(
        data => {
          this.divisionList = data;
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
    if (this.divisionregisterForm.invalid) {
      return;
    }

    ;
    this.adminService.registerDivision(this.divisionregisterForm.value)
      //  .pipe(first())
      .subscribe(
        data => {
          // this.divisionregisterForm.value.id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;
          // users.push(this.divisionregisterForm.value);
          // localStorage.setItem('smartvillageusers', JSON.stringify(users));
          this.alertService.presentAlert([this.divisionregisterForm.value.divisionname, '','Division Registration successful', 'OK']);
          this.router.navigate(['/admin/dashboard']);
        },
        error => {
          debugger
          this.alertService.error(['Division Registration Fail', '', error]);
         
          //  this.loading = false;
        });
  }
}
