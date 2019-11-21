import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService, AdminService } from 'src/app/_services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-grampanchayat-register',
  templateUrl: './grampanchayat-register.component.html',
  styleUrls: ['../registerLayout.scss'],
})
export class GrampanchayatRegisterComponent implements OnInit {

  grampanchayatregisterForm: FormGroup;
  stateList: any;
  divisionList: any;
  districtList: any;
  tehsilsList: any;
  constructor(
    private alertService: AlertService,
    private adminService: AdminService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }


  ngOnInit() {
    
    this.grampanchayatregisterForm = this.formBuilder.group({
      statename: ['', Validators.required],
      divisionname: ['', Validators.required],
      districtname: ['', Validators.required],
      tehsilsname: ['', Validators.required],
       grampanchayatname: ['', Validators.required],
       grampanchayatnameHindi: ['', Validators.required],
       grampanchayatnameMarathi: ['', Validators.required],
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
    return this.grampanchayatregisterForm.controls;
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
  changeDistrict(districtname) {
    
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
    if (this.grampanchayatregisterForm.invalid) {
      return;
    };
    this.adminService.registerGramPanchayat(this.grampanchayatregisterForm.value)
      //  .pipe(first())
      .subscribe(
        data => {
          // this.grampanchayatregisterForm.value.id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;
          // users.push(this.grampanchayatregisterForm.value);
          // localStorage.setItem('smartvillageusers', JSON.stringify(users));
          this.alertService.presentAlert([this.grampanchayatregisterForm.value.grampanchayatname, '','Grampanchayat Registration successful', 'OK']);
          this.router.navigate(['/admin/dashboard']);
        },
        error => {
          this.alertService.error(['Grampanchayat Registration Fail', '', error]);
          
          //  this.loading = false;
        });
  }
}
