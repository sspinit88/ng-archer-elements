import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArcherBtnComponent } from './archer-btn/archer-btn.component';

const itemComponents: any[] = [
  ArcherBtnComponent,
];

@NgModule({
  declarations: [
    ...itemComponents,

  ],
  imports: [
    CommonModule,
  ],
  exports: [
    ...itemComponents,
  ]
})
export class ArcherBtnModule {
}
