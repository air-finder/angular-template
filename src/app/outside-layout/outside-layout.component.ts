import { Component, computed } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { IconAnchorComponent } from '../shared/components/button/icon-button.component';
import { IconComponent } from '../shared/components/icon/icon.component';

@Component({
  selector: 'app-outside-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    IconAnchorComponent,
    IconComponent
  ],
  templateUrl: './outside-layout.component.html',
  styleUrl: './outside-layout.component.scss'
})
export class OutsideLayoutComponent {
  goBack = computed(() => true);
}
