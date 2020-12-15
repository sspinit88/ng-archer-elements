import { AfterContentInit, ChangeDetectionStrategy, Component, ContentChildren, Input, QueryList } from '@angular/core';

import { ArcherTabComponent } from '../archer-tab/archer-tab.component';

import { OTHERS_ERROR } from '../../shered/messages/error-message.constants';
import { ArcherTabEnum } from '../../shered/enums/archer-tabs/tab.enum';

@Component({
  selector: 'ar-archer-tab-panel',
  templateUrl: './archer-tab-panel.component.html',
  styleUrls: [
    '../../shered/styles/reset.scss',
    './archer-tab-panel.component.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArcherTabPanelComponent
  implements AfterContentInit {

  @ContentChildren(ArcherTabComponent)
  tabs: QueryList<ArcherTabComponent>;

  @Input()
  readonly defaultSelectedTabIdx: number = 0;

  readonly tabEnum: typeof ArcherTabEnum = ArcherTabEnum;

  constructor() {
  }

  ngAfterContentInit(): void {
    this.throwError();
    this.checkTabsAndEnableFirstActive(this.tabs);
  }

  onSelect(tab: ArcherTabComponent): void {
    if (!!tab.disabled) {
      return;
    }

    this.tabs.forEach(item => item.selected = false);
    tab.selected = true;
  }

  checkTabsAndEnableFirstActive(tabs: QueryList<ArcherTabComponent>): void {
    const defaultSelectedIdx = this.defaultSelectedTabIdx;
    const disabledTabs: number[] = this.checkDisabledTabNum(tabs);
    const notDisabledIdx: number[] = this.getAllNotDisabledIdx(tabs, disabledTabs);
    const selectedIdx: number = notDisabledIdx.includes(defaultSelectedIdx) ? defaultSelectedIdx : notDisabledIdx[0];
    this.onSelect(this.tabs.toArray()[selectedIdx]);
  }

  getAllNotDisabledIdx(tabs: QueryList<ArcherTabComponent>, disabled: number[]): number[] {
    const disabledTabs: number[] = [...disabled];
    const tabsArray = [...tabs.toArray()];
    const tabsIdxArray: number[] = tabsArray.map((item, i) => i);
    return tabsIdxArray.filter(n => disabledTabs.indexOf(n) === -1);
  }

  checkDisabledTabNum(tabs: QueryList<ArcherTabComponent>): number[] {
    const result: number[] = [];
    const length: number = tabs.toArray().length;

    if (length > 1) {
      tabs
        .toArray()
        .forEach((item, j) => {

          for (const key in item) {
            if (
              item.hasOwnProperty(key)
              && (key === this.tabEnum.disabled)
              && !!item[key]
            ) {
              result.push(j);
            }
          }

        });
    }

    return result;
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
