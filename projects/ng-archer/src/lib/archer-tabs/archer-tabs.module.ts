import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArcherTabComponent } from './archer-tab/archer-tab.component';
import { TabPanelComponent } from './tab-panel/tab-panel.component';


const itemComponents: any[] = [
  TabPanelComponent,
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
