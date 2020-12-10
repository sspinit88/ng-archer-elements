import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OTHERS_ERROR } from '../../messages/error-message.constants';

import { ArcherTabComponent } from './archer-tab.component';

describe('ArcherTabComponent', () => {
  let component: ArcherTabComponent;
  let fixture: ComponentFixture<ArcherTabComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ArcherTabComponent]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(ArcherTabComponent);
      component = fixture.componentInstance;
    });
  });

  it('should set title', () => {
    const data: string = 'title';
    component.title = data;
    fixture.detectChanges();
    expect(component.title).toBe(data);
  });

  it('should selected === false', () => {
    fixture.detectChanges();
    expect(component.selected).toBeFalse();
  });

  it('should set selected', () => {
    const data: boolean = true;
    component.selected = data;
    fixture.detectChanges();
    expect(component.selected).toBeTrue();
  });

  it('should set num', () => {
    const data: number = 321;
    component.num = data;
    fixture.detectChanges();
    expect(component.num).toBe(data);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
