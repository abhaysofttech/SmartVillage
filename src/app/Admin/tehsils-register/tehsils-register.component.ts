import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService, AdminService } from 'src/app/_services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tehsils-register',
  templateUrl: './tehsils-register.component.html',
  styleUrls: ['../registerLayout.scss'],
})
export class TehsilsRegisterComponent implements OnInit {
  
  tehsilregisterForm: FormGroup;
  stateList: any;
  divisionList: any;
  districtList: any;
  constructor(
    private alertService: AlertService,
    private adminService: AdminService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }


  ngOnInit() {
    this.tehsilregisterForm = this.formBuilder.group({
      statename: ['', Validators.required],
      divisionname: ['', Validators.required],
      districtname: ['', Validators.required],
      tehsilsname: ['', Validators.required],
      tehsilsnameHindi: ['', Validators.required],
      tehsilsnameMarathi: ['', Validators.required],
    });
    this.adminService.getAllStates()
      //  .pipe(first())
      .subscribe(
        data => {
          this.stateList = data;
          // this.changeState(this.stateList[0].statename);

        },
        error => {
          this.alertService.error(error);
          //  this.loading = false;
        });

  }
  get f() {
    return this.tehsilregisterForm.controls;
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
  changeDivision(divisionname) {
    // this.cities = this.countryList.find(con => con.name == count).cities;
    console.log(divisionname);
    this.adminService.getAllDistrict(divisionname)
      .subscribe(
        data => {
          this.districtList = data;
          console.log(data);

        },
        error => {
          console.log(error);

        });
  }
  getAllState() {
    this.adminService.getAllStates()
      //  .pipe(first())
      .subscribe(
        data => {
          this.stateList = data;
        },
        error => {
          this.alertService.error(error);
          //  this.loading = false;
        });
  }
  getDivisionByState(params) {
    this.adminService.getAllStates()
      //  .pipe(first())
      .subscribe(
        data => {
          this.divisionList = data;
        },
        error => {
          this.alertService.error(error);
          //  this.loading = false;
        });
  }
  onSubmit() {
    // stop here if form is invalid
    if (this.tehsilregisterForm.invalid) {
      return;
    };
    this.adminService.registerTehsils(this.tehsilregisterForm.value)
      //  .pipe(first())
      .subscribe(
        data => {
          // this.tehsilregisterForm.value.id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;
          // users.push(this.tehsilregisterForm.value);
          // localStorage.setItem('smartvillageusers', JSON.stringify(users));
       //   this.alertService.success('State Registration successful', true);
       this.alertService.presentAlert([this.tehsilregisterForm.value.tehsilsname, '','Tehsils Registration successful', 'OK']);

          this.router.navigate(['/admin/dashboard']);
        },
        error => {
          debugger
          this.alertService.error(['Tehsils Registration Fail', '', error]);
          //  this.loading = false;
        });
  }

}
