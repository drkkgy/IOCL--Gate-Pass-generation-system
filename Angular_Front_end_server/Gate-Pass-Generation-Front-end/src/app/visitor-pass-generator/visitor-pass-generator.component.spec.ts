import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitorPassGeneratorComponent } from './visitor-pass-generator.component';

describe('VisitorPassGeneratorComponent', () => {
  let component: VisitorPassGeneratorComponent;
  let fixture: ComponentFixture<VisitorPassGeneratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitorPassGeneratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitorPassGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
