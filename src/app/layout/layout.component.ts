import { Component } from '@angular/core';
import {AsideComponent} from "./aside/aside.component";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    AsideComponent
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

}
