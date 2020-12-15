import { TestBed } from '@angular/core/testing';

import { ArcherTabPanelService } from './archer-tab-panel.service';

describe('ArcherTabPanelService', () => {
  let service: ArcherTabPanelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArcherTabPanelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
