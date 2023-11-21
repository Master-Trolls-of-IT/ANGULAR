import { NgModule } from '@angular/core';
import { SharedModule } from '~/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { LoginPageRoutingModule } from '~/app/login/login-page-routing.module';
import { LoginPageComponent } from '~/app/login/pages/login-page/login-page.component';
import { MatRadioModule } from '@angular/material/radio';
import { RegisterPageComponent } from '~/app/login/pages/register-page/register-page.component';

@NgModule({
  declarations: [LoginPageComponent, RegisterPageComponent],
  imports: [CommonModule, SharedModule, LoginPageRoutingModule, MatRadioModule],
  exports: [],
})
export class LoginPageModule {}
