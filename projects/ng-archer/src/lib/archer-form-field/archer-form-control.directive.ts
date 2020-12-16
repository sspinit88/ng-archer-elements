import { Directive, Injector } from '@angular/core';
import { FormControl, NgControl, ValidationErrors } from '@angular/forms';

import { ErrorService } from '../shared/services/errors/error.service';
import { FormHelperService } from '../shared/services/helpers/form-helper/form-helper.service';

import { OTHERS_ERROR } from '../shared/messages/error-message.constants';
import { Control } from '../shared/models/archer-form-field/control.model';
import { BooleanFormProperty } from '../shared/enums/form/from-property.enum';

@Directive({
  selector: '[formControlName]'
})
export class ArcherFormControlDirective {

  value: unknown = null;
  control: FormControl;
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
    protected errorService: ErrorService,
    protected formHelperService: FormHelperService,
  ) {
  }

  getNgControl(): NgControl | null {
    return this.injector.get(NgControl, null);
  }

  getControl(ngControl: NgControl): FormControl {
    this.missingControl(ngControl);
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

  switchIsTouched(control: FormControl): void {
    this.isTouched = this.formHelperService.getPropertyBooleanValue(control, BooleanFormProperty.touched).value;
    this.isUnTouched = this.formHelperService.getPropertyBooleanValue(control, BooleanFormProperty.untouched).value;
  }

  setIsValid(control: FormControl): void {
    this.isInvalid = this.formHelperService.getPropertyBooleanValue(control, BooleanFormProperty.invalid).value;
    this.isValid = this.formHelperService.getPropertyBooleanValue(control, BooleanFormProperty.valid).value;
  }

  setIsDisabled(control: FormControl): void {
    this.isDisabled = this.formHelperService.getPropertyBooleanValue(control, BooleanFormProperty.disabled).value;
  }

  setIsPending(control: FormControl): void {
    this.isPending = this.formHelperService.getPropertyBooleanValue(control, BooleanFormProperty.pending).value;
  }

  setIsDirty(control: FormControl): void {
    this.isDirty = this.formHelperService.getPropertyBooleanValue(control, BooleanFormProperty.dirty).value;
  }

  getIsPristine(control: FormControl): void {
    this.isPristine = this.formHelperService.getPropertyBooleanValue(control, BooleanFormProperty.pristine).value;
  }

  // FIXME тут иначе
  getValue(control: FormControl): void {
    this.value = control.value;
  }

  // FIXME тут иначе
  getErrors(control: FormControl): void {
    this.errors = control.errors;
  }

  missingControl(control: Control | NgControl): void {
    this.errorService.checkAndThrowError(control, OTHERS_ERROR.componentIsMissing);
  }

}
