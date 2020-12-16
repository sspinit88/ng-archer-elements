import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';
import { ArcherFormControlDirective } from './archer-form-control.directive';
import { OTHERS_ERROR } from '../shared/messages/error-message.constants';

@Component({
  selector: 'ar-fake',
  template: `
    <form [formGroup]="form">
      <input formControlName="first"
             type="text">
      <input formControlName="second"
             type="text">
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
      second: ['second input'],
    });
  }
}

// FIXME замокать error's service
// describe('ArcherFormControlDirective', () => {
//   let fixture: ComponentFixture<FakeComponent>;
//   let componentInstance;
//   let directive: ArcherFormControlDirective;
//   let controlFirst: FormControl | AbstractControl;
//   let controlSecond: FormControl | AbstractControl;
//   // tslint:disable-next-line
//   let injector;
//
//   beforeEach(async () => {
//     TestBed.configureTestingModule({
//       declarations: [
//         FakeComponent,
//         ArcherFormControlDirective,
//       ],
//       imports: [
//         FormsModule,
//         ReactiveFormsModule,
//       ],
//     }).compileComponents()
//       .then(() => {
//         fixture = TestBed.createComponent(FakeComponent);
//         componentInstance = fixture.componentInstance;
//         injector = getTestBed();
//         // FIXME жидает 3 параметра
//         // directive = new ArcherFormControlDirective(getTestBed());
//
//         fixture.detectChanges();
//
//         controlFirst = componentInstance.form.controls.first;
//         controlSecond = componentInstance.form.controls.second;
//
//         console.log('controlFirst():', controlFirst);
//       });
//   });
//
//   xit('should set isPristine', () => {
//     directive.getIsPristine(controlFirst as FormControl);
//     expect(directive.isPristine).toBe(controlFirst.pristine);
//   });
//
//   xit('should set isTouched', () => {
//     directive.switchIsTouched(controlFirst as FormControl);
//     expect(directive.isTouched).toBe(controlFirst.touched);
//   });
//
//   xit('should set errors', () => {
//     directive.getErrors(controlFirst as FormControl);
//     expect(directive.errors).toBe(controlFirst.errors);
//   });
//
//   xit('should set isInvalid and isValid', () => {
//     directive.setIsValid(controlFirst as FormControl);
//     expect(directive.isInvalid).toBe(controlFirst.invalid);
//     expect(directive.isValid).toBe(controlFirst.valid);
//   });
//
//   xit('should set isDisabled', () => {
//     directive.setIsDisabled(controlFirst as FormControl);
//     expect(directive.isDisabled).toBe(controlFirst.disabled);
//   });
//
//   xit('should set isPending', () => {
//     directive.setIsPending(controlFirst as FormControl);
//     expect(directive.isPending).toBe(controlFirst.pending);
//   });
//
//   xit('should set isDirty', () => {
//     directive.setIsDirty(controlSecond as FormControl);
//     expect(directive.isDirty).toBe(controlSecond.dirty);
//   });
//
//   xit('should set value from control', () => {
//     directive.getValue(controlFirst as FormControl);
//     expect(directive.value === controlFirst.value).toBeTruthy();
//
//     directive.getValue(controlSecond as FormControl);
//     expect(directive.value === controlSecond.value).toBeTruthy();
//   });
//
//   // FIXME тут править или удалить
//   xit(`should return error: ${OTHERS_ERROR.componentIsMissing}`, () => {
//     directive.control = null;
//
//     expect(() => {
//       directive.getErrors(directive.control);
//     }).toThrow(new Error(OTHERS_ERROR.componentIsMissing));
//
//     expect(() => {
//       directive.setIsDisabled(directive.control);
//     }).toThrow(new Error(OTHERS_ERROR.componentIsMissing));
//
//     expect(() => {
//       directive.setIsValid(directive.control);
//     }).toThrow(new Error(OTHERS_ERROR.componentIsMissing));
//
//     expect(() => {
//       directive.setIsDirty(directive.control);
//     }).toThrow(new Error(OTHERS_ERROR.componentIsMissing));
//
//     expect(() => {
//       directive.setIsPending(directive.control);
//     }).toThrow(new Error(OTHERS_ERROR.componentIsMissing));
//
//     expect(() => {
//       directive.getValue(directive.control);
//     }).toThrow(new Error(OTHERS_ERROR.componentIsMissing));
//   });
//
// });
