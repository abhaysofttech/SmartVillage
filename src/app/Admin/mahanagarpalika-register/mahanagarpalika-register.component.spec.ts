import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MahanagarpalikaRegisterComponent } from './mahanagarpalika-register.component';

describe('MahanagarpalikaRegisterComponent', () => {
  let component: MahanagarpalikaRegisterComponent;
  let fixture: ComponentFixture<MahanagarpalikaRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MahanagarpalikaRegisterComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MahanagarpalikaRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
