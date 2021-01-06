import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';
import { ArcherFormControlDirective } from './archer-form-control.directive';
import { ErrorService } from '../shared/services/errors/error.service';
import { FormHelperService } from '../shared/services/helpers/form-helper/form-helper.service';
import { BooleanFormProperty } from '../shared/enums/form/from-property.enum';

@Component({
  selector: 'ar-fake',
  template: `
    <form [formGroup]="form">
      <input formControlName="first"
             type="text">
      <input formControlName="second"
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
      first: ['', [Validators.required]],
      second: ['second input'],
    });
  }
}

describe('ArcherFormControlDirective', () => {
  let fixture: ComponentFixture<FakeComponent>;
  let componentInstance;
  let directive: ArcherFormControlDirective;
  let controlFirst: FormControl;
  let controlSecond: FormControl;
  let mockErrorService: jasmine.SpyObj<ErrorService>;
  let mockFormHelperService: jasmine.SpyObj<FormHelperService>;
  const property: typeof BooleanFormProperty = BooleanFormProperty;
  // tslint:disable-next-line
  let injector;

  beforeEach(async () => {
    mockErrorService = jasmine.createSpyObj([
      'checkAndThrowError',
    ]);

    mockFormHelperService = jasmine.createSpyObj([
      'getPropertyBooleanValue',
    ]);

    TestBed.configureTestingModule({
      declarations: [
        FakeComponent,
        ArcherFormControlDirective,
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
      ],
      providers: [
        {
          provide: FormHelperService,
          useValue: mockFormHelperService
        }
      ],
    }).compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(FakeComponent);
        componentInstance = fixture.componentInstance;
        injector = getTestBed();

        directive = new ArcherFormControlDirective(injector, mockErrorService, mockFormHelperService);

        fixture.detectChanges();

        controlFirst = componentInstance.form.controls.first as FormControl;
        controlSecond = componentInstance.form.controls.second as FormControl;
      });
  });

  it('should to have been called mockFormHelperService.getPropertyBooleanValue()', () => {
    mockFormHelperService
      .getPropertyBooleanValue
      .and
      .returnValue({ exist: true, value: false });

    directive.setIsDirty(controlFirst);

    expect(mockFormHelperService.getPropertyBooleanValue)
      .toHaveBeenCalledWith(controlFirst, property.dirty);

    expect(mockFormHelperService.getPropertyBooleanValue)
      .toHaveBeenCalledTimes(1);
  });

  it('should set all value in true', () => {
    mockFormHelperService
      .getPropertyBooleanValue
      .and
      .returnValue({ exist: true, value: true });

    directive.setAll(controlFirst);

    expect(directive.isTouched).toBeTrue();
    expect(directive.isUnTouched).toBeTrue();
    expect(directive.isPending).toBeTrue();
    expect(directive.isPristine).toBeTrue();
    expect(directive.isDirty).toBeTrue();
    expect(directive.isDisabled).toBeTrue();
    expect(directive.isValid).toBeTrue();
    expect(directive.isInvalid).toBeTrue();
  });

  it('should set error\'s value', () => {
    directive.getErrors(controlFirst);
    expect(directive.errors).toEqual(controlFirst.errors);
  });

  it('should set value from control', () => {
    directive.getValue(controlFirst);
    expect(directive.value === controlFirst.value).toBeTruthy();

    directive.getValue(controlSecond);
    expect(directive.value === controlSecond.value).toBeTruthy();
  });

});
