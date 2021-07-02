import { Component, HostBinding, Input } from '@angular/core';
import { ArcherBtnEnum } from '../enums/archer-btn-enum.enum';
import { ArcherBtnType } from '../types/archer-btn-type.type';

@Component({
  selector: 'button[ar-btn], a[ar-btn]',
  exportAs: 'ar-btn',
  templateUrl: './archer-btn.component.html',
  styleUrls: ['./archer-btn.component.scss'],
})
export class ArcherBtnComponent {

  enum: typeof ArcherBtnEnum = ArcherBtnEnum;

  @Input() arType: ArcherBtnType = null;

  @HostBinding('class.ar-btn_primary') get isPrimary(): boolean {
    return this.arType === this.enum.primary;
  }

  @HostBinding('class.ar-btn_accent') get isAccent(): boolean {
    return this.arType === this.enum.accent;
  }

  @HostBinding('class.ar-btn_warn') get isWarn(): boolean {
    return this.arType === this.enum.warn;
  }

  @HostBinding('class.ar-btn_disabled') get isDisabled(): boolean {
    return this.arType === this.enum.disabled;
  }

  constructor() {
    console.log();
  }

}
