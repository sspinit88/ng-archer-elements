import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';
import { ArcherFormControlDirective } from './archer-form-control.directive';
import { OTHERS_ERROR } from '../shared/messages/error-message.constants';

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
  let controlFirst: FormControl | AbstractControl;
  let controlSecond: FormControl | AbstractControl;
  // tslint:disable-next-line
  let injector;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [
        FakeComponent,
        ArcherFormControlDirective,
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
      ],
    }).compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(FakeComponent);
        componentInstance = fixture.componentInstance;
        injector = getTestBed();
        directive = new ArcherFormControlDirective(getTestBed());

        fixture.detectChanges();

        controlFirst = componentInstance.form.controls.first;
        controlSecond = componentInstance.form.controls.second;
      });
  });

  it('should set isPristine', () => {
    directive.getIsPristine(controlFirst);
    expect(directive.isPristine).toBe(controlFirst.pristine);
  });

  it('should set isTouched', () => {
    directive.switchIsTouched(controlFirst);
    expect(directive.isTouched).toBe(controlFirst.touched);
  });

  it('should set errors', () => {
    directive.getErrors(controlFirst);
    expect(directive.errors).toBe(controlFirst.errors);
  });

  it('should set isInvalid and isValid', () => {
    directive.setIsValid(controlFirst);
    expect(directive.isInvalid).toBe(controlFirst.invalid);
    expect(directive.isValid).toBe(controlFirst.valid);
  });

  it('should set isDisabled', () => {
    directive.setIsDisabled(controlFirst);
    expect(directive.isDisabled).toBe(controlFirst.disabled);
  });

  it('should set isPending', () => {
    directive.setIsPending(controlFirst);
    expect(directive.isPending).toBe(controlFirst.pending);
  });

  it('should set isDirty', () => {
    directive.setIsDirty(controlSecond);
    expect(directive.isDirty).toBe(controlSecond.dirty);
  });

  it('should set value from control', () => {
    directive.getValue(controlFirst);
    expect(directive.value === controlFirst.value).toBeTruthy();

    directive.getValue(controlSecond);
    expect(directive.value === controlSecond.value).toBeTruthy();
  });

  it(`should return error: ${OTHERS_ERROR.componentIsMissing}`, () => {
    directive.control = null;

    expect(() => {
      directive.getErrors(directive.control);
    }).toThrow(new Error(OTHERS_ERROR.componentIsMissing));

    expect(() => {
      directive.setIsDisabled(directive.control);
    }).toThrow(new Error(OTHERS_ERROR.componentIsMissing));

    expect(() => {
      directive.setIsValid(directive.control);
    }).toThrow(new Error(OTHERS_ERROR.componentIsMissing));

    expect(() => {
      directive.setIsDirty(directive.control);
    }).toThrow(new Error(OTHERS_ERROR.componentIsMissing));

    expect(() => {
      directive.setIsPending(directive.control);
    }).toThrow(new Error(OTHERS_ERROR.componentIsMissing));

    expect(() => {
      directive.getValue(directive.control);
    }).toThrow(new Error(OTHERS_ERROR.componentIsMissing));
  });

});
