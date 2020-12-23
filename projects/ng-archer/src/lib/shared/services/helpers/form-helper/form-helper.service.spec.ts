import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormHelperService } from './form-helper.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BooleanFormProperty } from '../../../enums/form/from-property.enum';
import { PropertyCheckResult } from '../../../models/common/property-check-result.model';


@Component({
  selector: 'ar-fake',
  template: `
    <form [formGroup]="form">
      <input formControlName="first"
             type="text">
    </form>
  `
})
class FakeComponent
  implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      first: ['123', [Validators.required]],
    });
  }
}


describe('FormHelperService', () => {
  let service: FormHelperService;
  let fixture: ComponentFixture<FakeComponent>;
  let control: FormControl;
  const property: typeof BooleanFormProperty = BooleanFormProperty;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [
        FakeComponent,
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
      ],
    }).compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(FakeComponent);
        service = TestBed.inject(FormHelperService);

        fixture.detectChanges();

        control = fixture.componentInstance.form.controls.first as FormControl;
      });

  });

  it('should check property.touched ({ exist: true, value: true })', () => {
    fixture
      .debugElement
      .nativeElement
      .querySelector('input')
      .dispatchEvent(new Event('blur'));

    fixture.detectChanges();

    const res: PropertyCheckResult = service.getPropertyBooleanValue(control, property.touched);
    expect(res).toEqual({ exist: true, value: true });
  });

  it('should check property.touched ({ exist: true, value: false })', () => {
    const res: PropertyCheckResult = service.getPropertyBooleanValue(control, property.dirty);
    expect(res).toEqual({ exist: true, value: false });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
