import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordListComponent } from './record-list.component';

describe('RecordListComponent', () => {
  let component: RecordListComponent;
  let fixture: ComponentFixture<RecordListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecordListComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
