import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSensorComponent } from './form-sensor.component';

describe('FormSensorComponent', () => {
  let component: FormSensorComponent;
  let fixture: ComponentFixture<FormSensorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormSensorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormSensorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
