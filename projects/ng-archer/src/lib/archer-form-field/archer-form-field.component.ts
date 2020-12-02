import { AfterContentChecked, Component, ContentChild, HostBinding } from '@angular/core';
import { ArcherFormControlDirective } from './archer-form-control.directive';

@Component({
  selector: 'ar-form-field',
  templateUrl: './archer-form-field.component.html',
  styleUrls: ['./archer-form-field.component.scss']
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

  @HostBinding('class.el-archer-touched') get isTouched(): boolean {
    return this.formControlDirective.isTouched;
  }

  @HostBinding('class.el-archer-untouched') get isUnTouched(): boolean {
    return this.formControlDirective.isUnTouched;
  }

  @HostBinding('class.el-archer-pending') get isPending(): boolean {
    return this.formControlDirective.isPending;
  }

  @HostBinding('class.el-archer-pristine') get isPristine(): boolean {
    return this.formControlDirective.isPristine;
  }

  @HostBinding('class.el-archer-dirty') get isDirty(): boolean {
    return this.formControlDirective.isDirty;
  }

  @HostBinding('class.el-archer-disabled') get isDisabled(): boolean {
    return this.formControlDirective.isDisabled;
  }

  @HostBinding('class.el-archer-valid') get isValid(): boolean {
    return this.formControlDirective.isValid;
  }

  @HostBinding('class.el-archer-invalid') get isInvalid(): boolean {
    return this.formControlDirective.isInvalid;
  }

}
