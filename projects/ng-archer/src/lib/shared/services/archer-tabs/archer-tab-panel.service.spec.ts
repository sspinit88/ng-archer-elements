import { TestBed } from '@angular/core/testing';
import { ArcherTabPanelService } from './archer-tab-panel.service';
import { ArcherTabComponent } from '../../../archer-tabs/archer-tab/archer-tab.component';

describe('ArcherTabPanelService', () => {
  let service: ArcherTabPanelService;
  const fakeTabArray: ArcherTabComponent[] = [
    {
      disabled: true,
      num: null,
      selected: true,
      title: '1-Первый'
    },
    {
      disabled: true,
      num: null,
      selected: false,
      title: '2-Второй',
    },
    {
      disabled: false,
      num: null,
      selected: false,
      title: '3-Третий',
    }
  ];

  beforeEach(async () => {
    TestBed.configureTestingModule({})
      .compileComponents()
      .then(() => {
        service = TestBed.inject(ArcherTabPanelService);
      });
  });

  fit('should return first not disabled index of tabs (=== 2)', () => {
    expect(service.activeTabsIdx(fakeTabArray, 1))
      .toBe(2);
  });

  it('should return index of active tab', () => {
    expect(service.activeTabsIdx(fakeTabArray, 2))
      .toBe(2);
  });

  it('should return length of array === 1', () => {
    expect(service.getAllNotDisabledIdx(fakeTabArray, service.checkDisabledTabNum(fakeTabArray)).length)
      .toBe(1);
  });

  it(`should return array with length === 2 (have 2 disabled tabs)`, () => {
    expect(service.checkDisabledTabNum(fakeTabArray).length)
      .toBe(2);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
