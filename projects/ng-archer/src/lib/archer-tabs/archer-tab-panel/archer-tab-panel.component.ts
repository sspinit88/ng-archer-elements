import { AfterContentInit, ChangeDetectionStrategy, Component, ContentChildren, Input, QueryList } from '@angular/core';

import { ArcherTabComponent } from '../archer-tab/archer-tab.component';

import { ArcherTabPanelService } from '../../shared/services/archer-tabs/archer-tab-panel.service';
import { ErrorsService } from '../../shared/services/errors/errors.service';

import { OTHERS_ERROR } from '../../shared/messages/error-message.constants';

@Component({
  selector: 'ar-archer-tab-panel',
  templateUrl: './archer-tab-panel.component.html',
  styleUrls: [
    '../../shared/styles/reset.scss',
    './archer-tab-panel.component.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArcherTabPanelComponent
  implements AfterContentInit {

  @ContentChildren(ArcherTabComponent)
  tabs: QueryList<ArcherTabComponent>;

  @Input()
  defaultSelectedTabIdx: number = 0;

  constructor(
    private archerTabPanelService: ArcherTabPanelService,
    private errorsService: ErrorsService
  ) {
  }

  ngAfterContentInit(): void {
    this.throwError();
    this.checkTabsAndEnableFirstActive(this.tabs, this.defaultSelectedTabIdx);
  }

  onSelect(tab: ArcherTabComponent): void {
    if (
      !!tab.disabled
    ) {
      return;
    }

    this.tabs.forEach(item => item.selected = false);
    tab.selected = true;
  }

  checkTabsAndEnableFirstActive(tabs: QueryList<ArcherTabComponent>, selectedTab: number): void {
    const idx: number = this.archerTabPanelService.activeTabsIdx(tabs, selectedTab);

    tabs
      .forEach((item, i) => {
        if (i === idx) {
          this.onSelect(item);
        }
      });
  }

  setClass(tab: ArcherTabComponent): {} {
    return {
      selected: !!tab.selected,
    };
  }

  throwError(): void {
    this.errorsService
      .checkAndThrowError(this.tabs, OTHERS_ERROR.elementIsMissing);
  }
}
