import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArcherFormFieldComponent } from './archer-form-field.component';
import { ArcherFormControlDirective } from './archer-form-control.directive';

@NgModule({
  declarations: [
    ArcherFormFieldComponent,
    ArcherFormControlDirective,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    ArcherFormFieldComponent,
    ArcherFormControlDirective,
  ]
})
export class ArcherFormControlModule {
}
