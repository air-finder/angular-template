import { Routes } from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {LayoutComponent} from "./layout/layout.component";

export const routes: Routes = [
  { path: '', component: LayoutComponent },
  { path: 'login', component: LoginComponent },
];
