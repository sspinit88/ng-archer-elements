import { AfterContentChecked, ChangeDetectionStrategy, Component, ContentChild, HostBinding } from '@angular/core';
import { ArcherFormControlDirective } from './archer-form-control.directive';

@Component({
  selector: 'ar-form-field',
  templateUrl: './archer-form-field.component.html',
  styleUrls: ['./archer-form-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArcherFormFieldComponent
  implements AfterContentChecked {

  @ContentChild(ArcherFormControlDirective)
  formControlDirective: ArcherFormControlDirective;

  constructor() {
  }

  ngAfterContentChecked(): void {
    this.formControlDirective.controlInit();
  }

  @HostBinding('class.ar-touched') get isTouched(): boolean {
    return this.formControlDirective.isTouched;
  }

  @HostBinding('class.ar-untouched') get isUnTouched(): boolean {
    return this.formControlDirective.isUnTouched;
  }

  @HostBinding('class.ar-pending') get isPending(): boolean {
    return this.formControlDirective.isPending;
  }

  @HostBinding('class.ar-pristine') get isPristine(): boolean {
    return this.formControlDirective.isPristine;
  }

  @HostBinding('class.ar-dirty') get isDirty(): boolean {
    return this.formControlDirective.isDirty;
  }

  @HostBinding('class.ar-disabled') get isDisabled(): boolean {
    return this.formControlDirective.isDisabled;
  }

  @HostBinding('class.ar-valid') get isValid(): boolean {
    return this.formControlDirective.isValid;
  }

  @HostBinding('class.ar-invalid') get isInvalid(): boolean {
    return this.formControlDirective.isInvalid;
  }

}
