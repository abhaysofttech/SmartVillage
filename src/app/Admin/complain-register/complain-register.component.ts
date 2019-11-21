import { Component, OnInit, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService, AdminService, ComplainService } from 'src/app/_services';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { IconModalService } from 'src/app/_components/icon/icon-modal.service';

@Component({
  selector: 'app-complain-register',
  templateUrl: './complain-register.component.html',
  styleUrls: ['../registerLayout.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ComplainRegisterComponent implements OnInit {
  complainregisterForm: FormGroup;
  stateList:any;
  @Input() id: string;
  private element: any;
  constructor(
    private alertService: AlertService,
    private complainService: ComplainService,
    private formBuilder: FormBuilder,
    private router: Router,
    private el: ElementRef,
    private iconmodalService: IconModalService
  ) { 
    this.element = el.nativeElement;
  }

  ngOnInit() {
    debugger
    this.complainregisterForm = this.formBuilder.group({
      complainname: ['', Validators.required],
      complainTitle: ['', Validators.required]
    });

    document.body.appendChild(this.element);
     // close modal on background click
     this.element.addEventListener('click', el => {
      if (el.target.className === 'common-modal') {
        this.close();
      }
    });
       // add self (this modal instance) to the modal service so it's accessible from controllers
    //   this.modalService.add(this);
  }

  get f() {
    return this.complainregisterForm.controls;
  }

  openModal(id: string) {
    this.iconmodalService.open(id);
  }
// open modal
open(): void {
  debugger
  this.element.style.display = 'block';
  document.body.classList.add('common-modal-open');
}

// close modal
close(): void {
  this.element.style.display = 'none';
  document.body.classList.remove('common-modal-open');
}
  onSubmit() {
    debugger
    // stop here if form is invalid
    if (this.complainregisterForm.invalid) {
      return;
    }

  ;
    this.complainService.registerComplain(this.complainregisterForm.value)
      //  .pipe(first())
      .subscribe(
        data => {
          // this.complainregisterForm.value.id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;
          // users.push(this.complainregisterForm.value);
          // localStorage.setItem('smartvillageusers', JSON.stringify(users));
          this.alertService.success('New Complain Type Register successful', true);
         this.router.navigate(['/admin/dashboard']);
        },
        error => {
          this.alertService.error(['Complain Type Register Fail', '', error]);

        //  this.loading = false;
        });
  }
}
