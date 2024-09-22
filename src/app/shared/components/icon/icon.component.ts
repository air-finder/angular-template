import { Component, computed, input, NO_ERRORS_SCHEMA } from '@angular/core';
import { Icons } from '../../../../assets/svg/icons';

@Component({
  selector: 'svg[custom-icon]',
  standalone: true,
  imports: [],
  template: `
    <path [attr.d]="path()"></path>
  `,
  styleUrl: './icon.component.scss',
  host: {
    "width": "24",
    "height": "24",
    "viewBox": "0 0 24 24",
    "[attr.fill]": "color()"
  },
  schemas: [NO_ERRORS_SCHEMA]
})
export class IconComponent {
  icon = input.required<string>();
  color = input<string>('#666666');
  path = computed(() => Icons.getIcon(this.icon()));
}
