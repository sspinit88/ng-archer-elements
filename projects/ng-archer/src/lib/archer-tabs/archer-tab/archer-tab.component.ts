import { Component, HostBinding, Input } from '@angular/core';
import { ArcherTab } from '../interfaces/archer-tab.interface';

@Component({
  selector: 'ar-archer-tab',
  templateUrl: './archer-tab.component.html',
  styleUrls: ['./archer-tab.component.scss']
})
export class ArcherTabComponent
  implements ArcherTab {

  @Input()
  title: string;

  @Input()
  @HostBinding('class.selected')
  selected: boolean = false;

  @Input()
  num: number = null;

  @Input()
  disabled: boolean = false;

  constructor() {
  }

}
