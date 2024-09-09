import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormFieldComponent } from "../../shared/components/form-field/form-field.component";
import { SelectComponent } from '../../shared/components/select/select.component';
import { SelectOptionComponent } from '../../shared/components/select/select-option/select-option.component';
import { UserService } from '../../services/user.service';
import { LoginRequest } from '../../services/models/user/login.request';
import { AuthService } from '../../core/service/auth.service';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    FormFieldComponent,
    SelectComponent,
    SelectOptionComponent,
    TranslateModule,
    JsonPipe
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  form = new FormGroup({
    login: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private _router: Router
  ) {}

  test() {
    this.userService
      .login(this.form.value as LoginRequest)
      .then(r => this.authService.login(r.result))
      .then(() => this._router.navigate(['']));
  }
}
