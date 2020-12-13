import { AfterContentInit, ChangeDetectionStrategy, Component, ContentChildren, Input, QueryList } from '@angular/core';
import { ArcherTabComponent } from '../archer-tab/archer-tab.component';
import { OTHERS_ERROR } from '../../messages/error-message.constants';

@Component({
  selector: 'ar-archer-tab-panel',
  templateUrl: './archer-tab-panel.component.html',
  styleUrls: [
    './../../styles/reset.scss',
    './archer-tab-panel.component.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArcherTabPanelComponent
  implements AfterContentInit {

  @ContentChildren(ArcherTabComponent)
  tabs: QueryList<ArcherTabComponent>;

  @Input()
  readonly defaultSelectedTabNum: number = 0;

  constructor() {
  }

  ngAfterContentInit(): void {
    this.throwError();
    this.checkTabsAndSelectFirst();
  }

  onSelect(tab: ArcherTabComponent): void {
    this.tabs.forEach(item => item.selected = false);
    tab.selected = true;
  }

  checkTabsAndSelectFirst(): void {
    const tabsLength: number = this.tabs.toArray().length;
    const selectedTab = this.tabs.find(tab => tab.selected);

    if (!selectedTab) {
      this.tabs
        .forEach((tab, i) => {
          if (
            !(tabsLength < this.defaultSelectedTabNum)
            && (i === this.defaultSelectedTabNum)
          ) {
            this.onSelect(tab);
          }
        });
    }
  }

  setClass(tab: ArcherTabComponent): {} {
    return {
      selected: !!tab.selected,
    };
  }

  throwError(): void {
    if (!this.tabs) {
      throw new Error(OTHERS_ERROR.elementIsMissing);
    }
  }

}
