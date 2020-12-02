import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArcherFormControlDirective } from './archer-form-control.directive';
import { ArcherFormFieldComponent } from './archer-form-field.component';
import { By } from '@angular/platform-browser';
import { ArcherFormControlModule } from './archer-form-control.module';


@Component({
  selector: 'app-fake',
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
  let elFirst;

  beforeEach(async () => {
    TestBed.configureTestingModule({
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

  it('should set class="el-archer-touched el-archer-dirty el-archer-valid" if value exist', () => {
    fixture.detectChanges();
    elFirst.nativeElement.querySelector('input').value = 'test value';
    elFirst.nativeElement.querySelector('input').dispatchEvent(new Event('input'));
    elFirst.nativeElement.querySelector('input').dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    const res = !!fixture.nativeElement.querySelector('.el-archer-touched.el-archer-dirty.el-archer-valid');
    expect(!!res).toBeTruthy();
  });

  it('should set class="el-archer-pristine el-archer-invalid el-archer-touched" after blur', () => {
    fixture.detectChanges();
    elFirst.nativeElement.querySelector('input').dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    const res = !!fixture.nativeElement.querySelector('.el-archer-pristine.el-archer-invalid.el-archer-touched');
    expect(res).toBeTruthy();
  });

  it('should set class="el-archer-untouched el-archer-pristine el-archer-invalid" after init', () => {
    fixture.detectChanges();
    const res = !!fixture.nativeElement.querySelector('.el-archer-untouched.el-archer-pristine.el-archer-invalid');
    expect(!!res).toBeTruthy();
  });

  it('should create fake component with elements', () => {
    fixture.detectChanges();
    expect(fixture).toBeDefined();
  });

});
