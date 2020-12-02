import { AfterViewInit, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'ng-archer-example';

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      inp: ['', [Validators.required, Validators.max(4)]],
    });
  }

  ngAfterViewInit(): void {
    this.form
      .valueChanges
      .subscribe(value => {
        // FIXME delete
        console.group('Class: AppComponent, Method: , File: app.component.ts');
        console.log('value():', value);
        console.groupEnd();
      });
  }

}
