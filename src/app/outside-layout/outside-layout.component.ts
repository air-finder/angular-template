import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-outside-layout',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './outside-layout.component.html',
  styleUrl: './outside-layout.component.scss'
})
export class OutsideLayoutComponent {

}
