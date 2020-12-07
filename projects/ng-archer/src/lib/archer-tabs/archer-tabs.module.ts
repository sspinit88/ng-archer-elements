import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArcherTabComponent } from './archer-tab/archer-tab.component';
import { ArcherTabPanelComponent } from './archer-tab-panel/archer-tab-panel.component';

const itemComponents: any[] = [
  ArcherTabPanelComponent,
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
