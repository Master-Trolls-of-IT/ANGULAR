import { LoginService } from '~/app/login/services/login.service';
import { UserAuthenticatedStoreService } from '~/app/shared/stores/user/user-authenticated.store.service';
import { User } from '~/app/shared/models/user/user.model';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RoutesEnum } from '~/app/shared/models/routes/routes.enum';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  form: FormGroup;
  user: User;
  isLoginError: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private userAuthenticatedStoreService: UserAuthenticatedStoreService,
    private router: Router,
  ) {
    this.user = {} as User;

    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.userAuthenticatedStoreService.userAuthenticated$.subscribe(
      (user: User) => {
        this.user = user;
        if (Object.keys(user).length > 0) {
          this.form.patchValue({
            email: user.email,
            password: user.password,
          });
        }
      },
    );
  }

  onSubmit(): void {
    this.loginService.login(this.form.value.email, this.form.value.password);

    this.userAuthenticatedStoreService.userAuthenticated$.subscribe(
      (user: User) => {
        if (Object.keys(user).length > 0) {
          void this.router.navigate([RoutesEnum.Auction]);
        } else {
          this.isLoginError = true;
        }
      },
    );
  }

  register(): void {
    void this.router.navigate([RoutesEnum.Register]);
  }
}
