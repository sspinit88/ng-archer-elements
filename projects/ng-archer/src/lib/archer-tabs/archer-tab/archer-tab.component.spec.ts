import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArcherTabComponent } from './archer-tab.component';

describe('ArcherTabComponent', () => {
  let component: ArcherTabComponent;
  let fixture: ComponentFixture<ArcherTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArcherTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArcherTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
