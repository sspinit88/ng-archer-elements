import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { ArcherBtnComponent } from './archer-btn.component';
import { By } from '@angular/platform-browser';
import { ArcherBtnModule } from '../archer-btn.module';
import { ArcherBtnEnum } from '../enums/archer-btn-enum.enum';


@Component({
  selector: 'ar-fake',
  template: `
    <button ar-btn>
      Кнопочка!
    </button>
    <a ar-btn>
      Ашечка!
    </a>
  `
})
class FakeComponent {

  constructor() {
  }
}

describe('ArcherBtnComponent', () => {
  let fixture: ComponentFixture<FakeComponent>;
  let componentInstance: FakeComponent;

  let btnElements: DebugElement[];
  let btnElement: DebugElement;
  let aElement: DebugElement;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [
        FakeComponent
      ],
      imports: [
        ArcherBtnModule,
      ]
    }).compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(FakeComponent);
        componentInstance = fixture.componentInstance;

        btnElements = fixture
          .debugElement
          .queryAll(By.directive(ArcherBtnComponent));

        btnElement = btnElements[0];
        aElement = btnElements[1];
      });
  });

  it(`should set scc's class ${ArcherBtnEnum.disabled}`, () => {
    const name: string = ArcherBtnEnum.disabled;
    const cssClass: string = `ar-btn_${name}`;

    btnElement.componentInstance.arType = name;
    aElement.componentInstance.arType = name;

    fixture.detectChanges();

    const a: boolean = aElement.nativeElement.classList.contains(cssClass);
    const b: boolean = btnElement.nativeElement.classList.contains(cssClass);

    expect(a).toBeTrue();
    expect(b).toBeTrue();
  });

  it(`should set scc's class ${ArcherBtnEnum.warn}`, () => {
    const name: string = ArcherBtnEnum.warn;
    const cssClass: string = `ar-btn_${name}`;

    btnElement.componentInstance.arType = name;
    aElement.componentInstance.arType = name;

    fixture.detectChanges();

    const a: boolean = aElement.nativeElement.classList.contains(cssClass);
    const b: boolean = btnElement.nativeElement.classList.contains(cssClass);

    expect(a).toBeTrue();
    expect(b).toBeTrue();
  });

  it(`should set scc's class ${ArcherBtnEnum.accent}`, () => {
    const name: string = ArcherBtnEnum.accent;
    const cssClass: string = `ar-btn_${name}`;

    btnElement.componentInstance.arType = name;
    aElement.componentInstance.arType = name;

    fixture.detectChanges();

    const a: boolean = aElement.nativeElement.classList.contains(cssClass);
    const b: boolean = btnElement.nativeElement.classList.contains(cssClass);

    expect(a).toBeTrue();
    expect(b).toBeTrue();
  });

  it(`should set scc's class ${ArcherBtnEnum.primary}`, () => {
    const name = ArcherBtnEnum.primary;
    const cssClass: string = `ar-btn_${ArcherBtnEnum.primary}`;

    btnElement.componentInstance.arType = name;
    aElement.componentInstance.arType = name;

    fixture.detectChanges();

    const a: boolean = aElement.nativeElement.classList.contains(cssClass);
    const b: boolean = btnElement.nativeElement.classList.contains(cssClass);

    expect(a).toBeTrue();
    expect(b).toBeTrue();
  });

  it(`should create two ArcherBtnComponents`, () => {
    fixture.detectChanges();
    expect(btnElements.length).toBe(2);
  });
});
