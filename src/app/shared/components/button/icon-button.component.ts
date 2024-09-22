import { Component, ElementRef, NgZone } from '@angular/core';
import { AnchorBase, ButtonBase } from './button-base';

@Component({
  selector: 'button[custom-icon]',
  standalone: true,
  imports: [],
  templateUrl: './icon-button.component.html',
  styleUrl: './icon-button.component.scss'
})
export class IconButtonComponent extends ButtonBase {
  constructor(
    elementRef: ElementRef,
    ngZone: NgZone
  ) {
    super(elementRef, ngZone);
  }
}

@Component({
  selector: 'a[custom-icon]',
  standalone: true,
  imports: [],
  templateUrl: './icon-button.component.html',
  styleUrl: './icon-button.component.scss'
})
export class IconAnchorComponent extends AnchorBase {
  constructor(
    elementRef: ElementRef,
    ngZone: NgZone
  ) {
    super(elementRef, ngZone);
  }
}
