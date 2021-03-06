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
        <p id="one">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet culpa dolorem excepturi possimus quaerat, saepe!</p>
      </ar-archer-tab>

      <ar-archer-tab [title]="tabs.two.title">
        <p id="two">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet culpa dolorem excepturi possimus quaerat, saepe!</p>
      </ar-archer-tab>

      <ar-archer-tab [title]="tabs.three.title">
        <p id="three">
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

  const selectedClass: string = 'selected';
  const tabSelectorName: string = 'ar-archer-tab';
  const tabBtnClassName: string = '.ar-tab-btn';

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

  it('should set num of first tab === 654', () => {
    const tabNum: number = 0;
    const num: number = 654;

    tabs[0].componentInstance.selected = true;
    tabs[0].componentInstance.num = num;

    fixture.detectChanges();

    const res: string = tabPanel
      .nativeElement
      .querySelectorAll((tabBtnClassName))[tabNum]
      .querySelector('.num')
      .textContent;

    expect(res).toContain(`${num}`);
  });

  it('should disables first and last tab', () => {
    const testArray: number[] = [0, 2];
    const res: number[] = [];

    tabs[0].componentInstance.disabled = true;
    tabs[tabs.length - 1].componentInstance.disabled = true;

    fixture.detectChanges();

    tabPanel
      .nativeElement
      .querySelectorAll((tabBtnClassName))
      .forEach((item: HTMLElement, i: number) => {
        if (!item.classList.contains(selectedClass)) {
          res.push(i);
        }
      });

    expect(res.length).toBe(2);
    expect(res).toEqual(testArray);
  });

  it('should selected second tab', () => {
    const tabNum: number = 1;

    tabs[0].componentInstance.disabled = true;

    fixture.detectChanges();

    const resTab: boolean = tabPanel
      .nativeElement
      .querySelectorAll((tabBtnClassName))[tabNum]
      .classList
      .contains(selectedClass);

    const resContent: boolean = tabPanel
      .nativeElement
      .querySelectorAll((tabSelectorName))[tabNum]
      .classList
      .contains(selectedClass);

    expect(resTab && resContent).toBeTrue();
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
      .querySelectorAll((tabBtnClassName))[tabNum]
      .dispatchEvent(new Event('click'));

    fixture.detectChanges();

    const resTab = tabPanel
      .nativeElement
      .querySelectorAll((tabBtnClassName))[tabNum]
      .classList
      .contains(selectedClass);

    const resContent: boolean = tabPanel
      .nativeElement
      .querySelectorAll((tabSelectorName))[tabNum]
      .classList
      .contains(selectedClass);

    expect(resTab && resContent).toBeTrue();
  });

  it('should select the second tab after clicking', () => {
    const tabNum: number = 1;

    fixture.detectChanges();

    tabPanel
      .nativeElement
      .querySelectorAll((tabBtnClassName))[tabNum]
      .dispatchEvent(new Event('click'));

    fixture.detectChanges();

    const resTab = tabPanel
      .nativeElement
      .querySelectorAll((tabBtnClassName))[tabNum]
      .classList
      .contains(selectedClass);

    const resContent: boolean = tabPanel
      .nativeElement
      .querySelectorAll((tabSelectorName))[tabNum]
      .classList
      .contains(selectedClass);

    expect(resTab && resContent).toBeTrue();
  });

  it(`should select the first tab`, () => {
    const tabNum: number = 0;

    fixture.detectChanges();

    const resTab = tabPanel
      .nativeElement
      .querySelectorAll((tabBtnClassName))[tabNum]
      .classList
      .contains(selectedClass);

    const resContent: boolean = tabPanel
      .nativeElement
      .querySelectorAll((tabSelectorName))[tabNum]
      .classList
      .contains(selectedClass);

    expect(resTab && resContent).toBeTrue();
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
