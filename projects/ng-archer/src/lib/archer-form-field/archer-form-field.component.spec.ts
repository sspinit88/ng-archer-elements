import { Component, DebugElement, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArcherFormFieldComponent } from './archer-form-field.component';
import { By } from '@angular/platform-browser';
import { ArcherFormControlModule } from './archer-form-control.module';


@Component({
  selector: 'ar-fake',
  template: `
    <form [formGroup]="form">
      <ar-form-field id="element">
        <input formControlName="first"
               type="text">
      </ar-form-field>
    </form>
  `
})
class FakeComponent
  implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      first: ['', [Validators.required]],
    });
  }
}

describe('ArcherFormFieldComponent', () => {
  let fixture: ComponentFixture<FakeComponent>;
  let componentInstance;
  let elFirst: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        FakeComponent,
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        ArcherFormControlModule
      ],
    }).compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(FakeComponent);
        componentInstance = fixture.componentInstance;

        elFirst = fixture.debugElement.query(By.directive(ArcherFormFieldComponent));
      });
  });

  it('should set class="ar-touched ar-dirty ar-valid" if value exist', () => {
    fixture.detectChanges();
    elFirst.nativeElement.querySelector('input').value = 'test value';
    elFirst.nativeElement.querySelector('input').dispatchEvent(new Event('input'));
    elFirst.nativeElement.querySelector('input').dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    const res = !!fixture.nativeElement.querySelector('.ar-touched.ar-dirty.ar-valid');
    expect(res).toBeTruthy();
  });

  it('should set class="ar-pristine ar-invalid ar-touched" after blur', () => {
    fixture.detectChanges();
    elFirst.nativeElement.querySelector('input').dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    const res = !!fixture.nativeElement.querySelector('.ar-pristine.ar-invalid.ar-touched');
    expect(res).toBeTruthy();
  });

  it('should set class="ar-untouched ar-pristine ar-invalid" after init', () => {
    fixture.detectChanges();
    const res = !!fixture.nativeElement.querySelector('.ar-untouched.ar-pristine.ar-invalid');
    expect(res).toBeTruthy();
  });

  it('should create fake component with elements', () => {
    fixture.detectChanges();
    expect(fixture).toBeDefined();
  });

});
