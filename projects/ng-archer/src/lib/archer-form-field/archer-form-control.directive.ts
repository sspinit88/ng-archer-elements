import { Directive, Injector } from '@angular/core';
import { AbstractControl, FormControl, NgControl, ValidationErrors } from '@angular/forms';
import { OTHERS_ERROR } from '../shared/messages/error-message.constants';

@Directive({
  selector: '[formControlName]'
})
export class ArcherFormControlDirective {

  value: unknown = null;
  control: FormControl | AbstractControl;
  errors: ValidationErrors | null;

  isTouched: boolean;
  isUnTouched: boolean;
  isPending: boolean;
  isPristine: boolean;
  isDirty: boolean;
  isDisabled: boolean;
  isValid: boolean;
  isInvalid: boolean;

  constructor(
    protected injector: Injector,
  ) {
  }

  getNgControl(): NgControl | null {
    return this.injector.get(NgControl, null);
  }

  getControl(ngControl: NgControl): FormControl {
    return ngControl.control as FormControl;
  }

  controlInit(): void {
    const ngControl: NgControl = this.getNgControl() as NgControl;
    this.control = this.getControl(ngControl);
    this.getValue(this.control);
    this.switchIsTouched(this.control);
    this.getErrors(this.control);
    this.setIsDisabled(this.control);
    this.setIsValid(this.control);
    this.setIsDirty(this.control);
    this.setIsPending(this.control);
    this.getIsPristine(this.control);
  }

  switchIsTouched(control: FormControl | AbstractControl): void {
    try {
      this.isTouched = control.touched;
      this.isUnTouched = control.untouched;
    } catch (e) {
      this.missingControl(control);
    }
  }

  getErrors(control: FormControl | AbstractControl): void {
    try {
      this.errors = control.errors;
    } catch (e) {
      this.missingControl(control);
    }
  }

  setIsValid(control: FormControl | AbstractControl): void {
    try {
      this.isInvalid = control.invalid;
      this.isValid = control.valid;
    } catch (e) {
      this.missingControl(control);
    }
  }

  setIsDisabled(control: FormControl | AbstractControl): void {
    try {
      this.isDisabled = control.disabled;
    } catch (e) {
      this.missingControl(control);
    }
  }

  setIsPending(control: FormControl | AbstractControl): void {
    try {
      this.isPending = control.pending;
    } catch (e) {
      this.missingControl(control);
    }
  }

  setIsDirty(control: FormControl | AbstractControl): void {
    try {
      this.isDirty = control.dirty;
    } catch (e) {
      this.missingControl(control);
    }
  }

  getValue(control: FormControl | AbstractControl): void {
    try {
      this.value = control.value;
    } catch (e) {
      this.missingControl(control);
    }
  }

  getIsPristine(control: FormControl | AbstractControl): void {
    try {
      this.isPristine = control.pristine;
    } catch (e) {
      this.missingControl(control);
    }
  }

  missingControl(control: FormControl | AbstractControl): void {
    if (!control) {
      throw new Error(OTHERS_ERROR.componentIsMissing);
    }
  }

}
