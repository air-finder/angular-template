import { Component, signal, viewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormFieldComponent } from '../../shared/components/form-field/form-field.component';
import { TranslateModule } from '@ngx-translate/core';
import { StepperComponent } from '../../shared/components/stepper/stepper.component';
import { StepComponent } from '../../shared/components/stepper/step/step.component';
import { UserService } from '../../services/user.service';
import { ForgotPasswordForm } from './forgot-password.form';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TranslateModule,
    FormFieldComponent,
    StepperComponent,
    StepComponent
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  form = new ForgotPasswordForm();
  stepper = viewChild(StepperComponent);
  protected loading = signal(false);

  constructor(
    private userService: UserService,
    private _router: Router
  ) {}

  async checkNext() {
    this.loading.set(true);
    switch(this.stepper()?.currentIndex()) {
      case 0:
        await this.sendCode();
        break;
      case 1:
        if(this.form.secondStep.invalid) break;
        await this.verifyCode();
        break;
      case 2:
        if(this.form.thirdStep.invalid) break;
        await this.changePassword();
        break;
    }
    this.loading.set(false);
  }

  async sendCode() {
    if (this.form.firstStep.invalid) return;
    return await this.userService
      .forgotPassword(this.form.getFirstStepRequest())
      .then(r => { if(r?.success) this.stepper()!.next() })
      .catch(() => this.form.firstStep.reset());;
  }

  async verifyCode() {
    if (this.form.secondStep.invalid) return;
    return await this.userService
      .forgotPasswordCode(this.form.getSecondStepRequest())
      .then(r => {if(r?.success) this.stepper()!.next()})
      .catch(() => this.form.secondStep.reset());
  }

  async changePassword() {
    if (this.form.thirdStep.invalid) return;
    return await this.userService
      .forgotPasswordUpdate(this.form.getThirdStepRequest())
      .then(() => this._router.navigate(['/login']))
      .catch(() => this.form.thirdStep.reset());
  }
}
