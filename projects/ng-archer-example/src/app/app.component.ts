import { AfterViewInit, ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements AfterViewInit {
  title = 'ng-archer-example';

  form: FormGroup;
  inputValue: string = '';

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
      .subscribe((value) => {
        this.inputValue = value.inp;
      });
  }

}
