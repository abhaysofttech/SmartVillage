import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NagarpanchayatRegisterComponent } from './nagarpanchayat-register.component';

describe('NagarpanchayatRegisterComponent', () => {
  let component: NagarpanchayatRegisterComponent;
  let fixture: ComponentFixture<NagarpanchayatRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NagarpanchayatRegisterComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NagarpanchayatRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
