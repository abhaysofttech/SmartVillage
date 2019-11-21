import { Component, OnInit } from '@angular/core';
import { AlertService, AdminService, ComplainService } from 'src/app/_services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subcomplain-register',
  templateUrl: './subcomplain-register.component.html',
  styleUrls: ['../registerLayout.scss'],
})
export class SubComplainRegisterComponent implements OnInit {
  subcomplainregisterForm: FormGroup;
  complainList: any;
  divisionList: any;
  constructor(
    private alertService: AlertService,
    private complainService: ComplainService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit() {
    this.subcomplainregisterForm = this.formBuilder.group({
      complainname: ['', Validators.required],
      subcomplainname: ['', Validators.required],
      subcomplainTitle: ['', Validators.required]
    });
    this.complainService.getcomplainname()
      //  .pipe(first())
      .subscribe(
        data => {
          this.complainList = data;

        },
        error => {
          debugger
          this.alertService.error(error);
          //  this.loading = false;
        });

  }
  get f() {
    return this.subcomplainregisterForm.controls;
  }
 

  onSubmit() {
    debugger
    // stop here if form is invalid
    if (this.subcomplainregisterForm.invalid) {
      return;
    }

    ;
    this.complainService.registerSubComplain(this.subcomplainregisterForm.value)
      //  .pipe(first())
      .subscribe(
        data => {
          // this.subcomplainregisterForm.value.id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;
          // users.push(this.subcomplainregisterForm.value);
          // localStorage.setItem('smartvillageusers', JSON.stringify(users));
          this.alertService.presentAlert([this.subcomplainregisterForm.value.subcomplainname, '','Sub Complain Registration successful', 'OK']);
          this.router.navigate(['/admin/dashboard']);
        },
        error => {
          debugger
          this.alertService.error(['Division Registration Fail', '', error]);
         
          //  this.loading = false;
        });
  }
}
