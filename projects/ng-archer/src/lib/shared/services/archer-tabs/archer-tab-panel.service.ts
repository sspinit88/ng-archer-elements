import { Injectable } from '@angular/core';

import { ArcherTabComponent } from '../../../archer-tabs/archer-tab/archer-tab.component';
import { ArcherTabEnum } from '../../enums/archer-tabs/tab.enum';

@Injectable({
  providedIn: 'root'
})
export class ArcherTabPanelService {

  readonly tabEnum: typeof ArcherTabEnum = ArcherTabEnum;

  constructor() {
  }

  activeTabsIdx(tabs: ArcherTabComponent[], defaultSelectedTabIdx: number): number {
    const defaultSelectedIdx = defaultSelectedTabIdx;
    const disabledTabs: number[] = this.checkDisabledTabNum(tabs);
    const notDisabledIdx: number[] = this.getAllNotDisabledIdx(tabs, disabledTabs);

    return notDisabledIdx.includes(defaultSelectedIdx) ? defaultSelectedIdx : notDisabledIdx[0];
  }

  getAllNotDisabledIdx(tabs: ArcherTabComponent[], disabled: number[]): number[] {
    const disabledTabs: number[] = [...disabled];
    const tabsIdxArray: number[] = tabs.map((item, i) => i);

    return tabsIdxArray.filter(n => disabledTabs.indexOf(n) === -1);
  }

  checkDisabledTabNum(tabs: ArcherTabComponent[]): number[] {
    const result: number[] = [];
    const length: number = tabs.length;

    if (length > 1) {
      tabs
        .forEach((item: ArcherTabComponent, j: number) => {

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

}
