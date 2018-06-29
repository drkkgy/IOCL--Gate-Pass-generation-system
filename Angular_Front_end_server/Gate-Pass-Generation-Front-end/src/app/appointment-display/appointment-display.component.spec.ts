import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentDisplayComponent } from './appointment-display.component';

describe('AppointmentDisplayComponent', () => {
  let component: AppointmentDisplayComponent;
  let fixture: ComponentFixture<AppointmentDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppointmentDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
