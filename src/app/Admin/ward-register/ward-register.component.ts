import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService, AdminService } from 'src/app/_services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ward-register',
  templateUrl: './ward-register.component.html',
  styleUrls: ['../registerLayout.scss'],
})
export class WardRegisterComponent implements OnInit {

  wardregisterForm: FormGroup;
  stateList: any;
  divisionList: any;
  districtList: any;
  tehsilsList: any;
  grampanchayatList: any;
  constructor(
    private alertService: AlertService,
    private adminService: AdminService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }


  ngOnInit() {
    debugger;
    this.wardregisterForm = this.formBuilder.group({
      statename: ['', Validators.required],
      divisionname: ['', Validators.required],
      districtname: ['', Validators.required],
      tehsilsname: ['', Validators.required],
      grampanchayatname: ['', Validators.required],
      wardname: ['', Validators.required],
      wardnameHindi: ['', Validators.required],
      wardnameMarathi: ['', Validators.required],
      wardmembername: ['', Validators.required],
      wardmembernameHindi: ['', Validators.required],
      wardmembernameMarathi: ['', Validators.required],
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
    return this.wardregisterForm.controls;
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
  changeDistrict(districtname) {
    debugger;
    // this.cities = this.countryList.find(con => con.name == count).cities;
    console.log(districtname);
    this.adminService.getAllTehsils(districtname)
      .subscribe(
        data => {
          this.tehsilsList = data;
          console.log(data);

        },
        error => {
          console.log(error);

        });
  }
  changeTehsils(tehsilsname) {
    debugger;
    // this.cities = this.countryList.find(con => con.name == count).cities;
    console.log(tehsilsname);
    this.adminService.getAllGramPanchayat(tehsilsname)
      .subscribe(
        data => {
          this.grampanchayatList = data;
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
    if (this.wardregisterForm.invalid) {
      return;
    };
    this.adminService.registerMahaNagarPalika(this.wardregisterForm.value)
      //  .pipe(first())
      .subscribe(
        data => {
          // this.wardregisterForm.value.id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;
          // users.push(this.wardregisterForm.value);
          // localStorage.setItem('smartvillageusers', JSON.stringify(users));
         // this.alertService.success('State Registration successful', true);
          this.router.navigate(['/admin/dashboard']);
        },
        error => {
          this.alertService.error(['Ward Registration Fail', '', error]);

        });
  }
}
