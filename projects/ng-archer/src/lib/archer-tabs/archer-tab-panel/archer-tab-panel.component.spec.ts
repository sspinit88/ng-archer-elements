import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ArcherTabsModule } from '../archer-tabs.module';
import { ArcherTabComponent } from '../archer-tab/archer-tab.component';
import { ArcherTabPanelComponent } from './archer-tab-panel.component';
import { OTHERS_ERROR } from '../../shared/messages/error-message.constants';

@Component({
  selector: 'ar-fake',
  template: `
    <ar-archer-tab-panel>
      <ar-archer-tab [title]="tabs.one.title">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet culpa dolorem excepturi possimus quaerat, saepe!</p>
      </ar-archer-tab>

      <ar-archer-tab [title]="tabs.two.title">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet culpa dolorem excepturi possimus quaerat, saepe!</p>
      </ar-archer-tab>

      <ar-archer-tab [title]="tabs.three.title">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet culpa dolorem excepturi possimus quaerat, saepe!</p>
      </ar-archer-tab>
    </ar-archer-tab-panel>
  `,
})
class FakeComponent {

  tabs = {
    one: {
      title: 'Первый Заголовок'
    },
    two: {
      title: 'Второй Заголовок'
    },
    three: {
      title: 'Третий Заголовок'
    }
  };

  constructor() {
  }

}

describe('ArcherTabPanelComponent', () => {
  let fixture: ComponentFixture<FakeComponent>;
  let componentInstance: FakeComponent;

  let tabPanel: DebugElement;
  let tabs: DebugElement[];

  // FIXME замокать сервисы и проверить все тесты!!!!
  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [
        FakeComponent,
      ],
      imports: [
        ArcherTabsModule,
      ],

    }).compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(FakeComponent);
        componentInstance = fixture.componentInstance;

        tabPanel = fixture
          .debugElement
          .query(By.directive(ArcherTabPanelComponent));

        tabs = fixture
          .debugElement
          .queryAll(By.directive(ArcherTabComponent));
      });
  });

  it('should selected second tab', () => {
    const tabNum: number = 1;

    tabs[0].componentInstance.disabled = true;

    fixture.detectChanges();

    const res: boolean = tabPanel
      .nativeElement
      .querySelectorAll('.ar-tab-btn')[tabNum]
      .classList
      .contains('selected');

    expect(res).toBeTrue();
  });

  it(`should throw an error: ${OTHERS_ERROR.elementIsMissing}`, () => {
    fixture.detectChanges();

    tabPanel.componentInstance.tabs = undefined;

    expect(() => {
      tabPanel
        .componentInstance
        .ngAfterContentInit();
    }).toThrow(new Error(OTHERS_ERROR.elementIsMissing));
  });

  it('should select the third tab after clicking', () => {
    const tabNum: number = 2;

    fixture.detectChanges();

    tabPanel
      .nativeElement
      .querySelectorAll('.ar-tab-btn')[tabNum]
      .dispatchEvent(new Event('click'));

    fixture.detectChanges();

    const res = tabPanel
      .nativeElement
      .querySelectorAll('.ar-tab-btn')[tabNum]
      .classList
      .contains('selected');

    expect(res).toBeTrue();
  });

  it('should select the second tab after clicking', () => {
    const tabNum: number = 1;

    fixture.detectChanges();

    tabPanel
      .nativeElement
      .querySelectorAll('.ar-tab-btn')[tabNum]
      .dispatchEvent(new Event('click'));

    fixture.detectChanges();

    const res = tabPanel
      .nativeElement
      .querySelectorAll('.ar-tab-btn')[1]
      .classList
      .contains('selected');

    expect(res).toBeTrue();
  });

  it(`should select the first tab`, () => {
    const tabNum: number = 0;

    fixture.detectChanges();

    const res = tabPanel
      .nativeElement
      .querySelectorAll('.ar-tab-btn')[tabNum]
      .classList
      .contains('selected');

    expect(res).toBeTrue();
  });

  it('should set all title of tabs', () => {
    fixture.detectChanges();

    const titles: string[] = [];

    tabPanel
      .nativeElement
      .querySelectorAll('.ar-tab-btn__title > .text')
      .forEach((item: HTMLSpanElement) => {
        const data: string = (!!item && item.textContent != null) ? item.textContent.trim() : '';
        titles.push(data);
      });

    expect([
      componentInstance.tabs.one.title,
      componentInstance.tabs.two.title,
      componentInstance.tabs.three.title,
    ]).toEqual(titles);

  });

  it('should get three tabs', () => {
    fixture.detectChanges();
    expect(tabs.length).toBe(3);
  });

});
