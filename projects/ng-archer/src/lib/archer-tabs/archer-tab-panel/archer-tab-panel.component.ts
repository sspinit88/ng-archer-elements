import { AfterContentInit, Component, ContentChildren, QueryList } from '@angular/core';
import { ArcherTabComponent } from '../archer-tab/archer-tab.component';

@Component({
  selector: 'ar-archer-tab-panel',
  templateUrl: './archer-tab-panel.component.html',
  styleUrls: [
    './../../styles/reset.scss',
    './archer-tab-panel.component.scss',
  ]
})
export class ArcherTabPanelComponent
  implements AfterContentInit {

  @ContentChildren(ArcherTabComponent) tabs: QueryList<ArcherTabComponent>;

  constructor() {
  }

  ngAfterContentInit(): void {

  }

}
