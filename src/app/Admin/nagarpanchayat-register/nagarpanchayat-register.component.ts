import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService, AdminService } from 'src/app/_services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nagarpanchayat-register',
  templateUrl: './nagarpanchayat-register.component.html',
  styleUrls: ['../registerLayout.scss'],
})
export class NagarpanchayatRegisterComponent implements OnInit {

 
  nagarpanchayatregisterForm: FormGroup;
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
    debugger;
    this.nagarpanchayatregisterForm = this.formBuilder.group({
      statename: ['', Validators.required],
      divisionname: ['', Validators.required],
      districtname: ['', Validators.required],
      nagarpanchayatname: ['', Validators.required],
      nagarpanchayatnameHindi: ['', Validators.required],
      nagarpanchayatnameMarathi: ['', Validators.required],
    });
    this.adminService.getAllStates()
      //  .pipe(first())
      .subscribe(
        data => {
          debugger;
          this.stateList = data;
          // this.changeState(this.stateList[0].statename);

        },
        error => {
          debugger
          this.alertService.error(error);
          //  this.loading = false;
        });

  }
  get f() {
    return this.nagarpanchayatregisterForm.controls;
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
    debugger;
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
    if (this.nagarpanchayatregisterForm.invalid) {
      return;
    };
    this.adminService.registerNagarPanchayat(this.nagarpanchayatregisterForm.value)
      //  .pipe(first())
      .subscribe(
        data => {
          // this.nagarpanchayatregisterForm.value.id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;
          // users.push(this.nagarpanchayatregisterForm.value);
          // localStorage.setItem('smartvillageusers', JSON.stringify(users));
          this.alertService.presentAlert([this.nagarpanchayatregisterForm.value.nagarpanchayatname, '','Nagarpanchayat Registration successful', 'OK']);
          this.router.navigate(['/admin/dashboard']);
        },
        error => {
          this.alertService.error(['NagarPanchayat Registration Fail', '', error]);

        });
  }

}
