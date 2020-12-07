import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArcherTabComponent } from './archer-tab/archer-tab.component';

const itemComponents: any[] = [
  ArcherTabComponent,
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
  ],
})
export class ArcherTabsModule {
}
