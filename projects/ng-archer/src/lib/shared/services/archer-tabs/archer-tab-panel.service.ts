import { Injectable, QueryList } from '@angular/core';
import { ArcherTabComponent } from '../../../archer-tabs/archer-tab/archer-tab.component';
import { ArcherTabEnum } from '../../enums/archer-tabs/tab.enum';

@Injectable({
  providedIn: 'root'
})
export class ArcherTabPanelService {

  readonly tabEnum: typeof ArcherTabEnum = ArcherTabEnum;

  constructor() {
  }

  // FIXME тестировать
  activeTabsIdx(tabs: QueryList<ArcherTabComponent>, defaultSelectedTabIdx: number): number {
    const defaultSelectedIdx = defaultSelectedTabIdx;
    const disabledTabs: number[] = this.checkDisabledTabNum(tabs);
    const notDisabledIdx: number[] = this.getAllNotDisabledIdx(tabs, disabledTabs);

    return notDisabledIdx.includes(defaultSelectedIdx) ? defaultSelectedIdx : notDisabledIdx[0];
  }

  // FIXME тестировать
  getAllNotDisabledIdx(tabs: QueryList<ArcherTabComponent>, disabled: number[]): number[] {
    const disabledTabs: number[] = [...disabled];
    const tabsArray = [...tabs.toArray()];
    const tabsIdxArray: number[] = tabsArray.map((item, i) => i);

    return tabsIdxArray.filter(n => disabledTabs.indexOf(n) === -1);
  }

  // FIXME тестировать
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

}
