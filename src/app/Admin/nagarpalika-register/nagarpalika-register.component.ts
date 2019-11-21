import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService, AdminService } from 'src/app/_services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nagarpalika-register',
  templateUrl: './nagarpalika-register.component.html',
  styleUrls: ['../registerLayout.scss'],
})
export class NagarpalikaRegisterComponent implements OnInit {

 
  nagarpalikaregisterForm: FormGroup;
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
    this.nagarpalikaregisterForm = this.formBuilder.group({
      statename: ['', Validators.required],
      divisionname: ['', Validators.required],
      districtname: ['', Validators.required],
      nagarpalikaname: ['', Validators.required],
      nagarpalikanameHindi: ['', Validators.required],
      nagarpalikanameMarathi: ['', Validators.required],
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
    return this.nagarpalikaregisterForm.controls;
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
    if (this.nagarpalikaregisterForm.invalid) {
      return;
    };
    this.adminService.registerMahaNagarPalika(this.nagarpalikaregisterForm.value)
      //  .pipe(first())
      .subscribe(
        data => {
          // this.nagarpalikaregisterForm.value.id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;
          // users.push(this.nagarpalikaregisterForm.value);
          // localStorage.setItem('smartvillageusers', JSON.stringify(users));
          this.alertService.presentAlert([this.nagarpalikaregisterForm.value.nagarpalikaname, '','Nagarpalika Registration successful', 'OK']);
          this.router.navigate(['/admin/dashboard']);
        },
        error => {
                  this.alertService.error(['Nagarpalika Registration Fail', '', error]);
        
          //  this.loading = false;
        });
  }

}
