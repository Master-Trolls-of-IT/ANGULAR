import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ageValidator } from '~/app/shared/utils/age-validator.utils';
import { Router } from '@angular/router';
import { RoutesEnum } from '~/app/shared/models/routes/routes.enum';
import { UserStoreService } from '~/app/shared/stores/user/user.store.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
})
export class RegisterPageComponent {
  form: FormGroup;
  today: Date = new Date();
  isFormError: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userStoreService: UserStoreService,
  ) {
    this.form = this.formBuilder.group({
      firstname: ['', Validators.compose([Validators.minLength(3)])],
      lastname: ['', Validators.compose([Validators.minLength(3)])],
      birthdate: ['', [Validators.required, ageValidator(18)]],
      email: ['', Validators.compose([Validators.email])],
      password: ['', Validators.required],
      profilePicture: ['avatar-glass-man.svg'],
      arts: [false],
      books: [false],
      vehicles: [false],
    });
  }

  onSubmit(): void {
    if (
      this.form.valid &&
      !this.userStoreService.isExistingEmail(this.form.value['email'])
    ) {
      this.userStoreService.addUser({
        ...this.form.value,
        preferences: {
          arts: this.form.value.arts,
          books: this.form.value.books,
          vehicles: this.form.value.vehicles,
        },
      });
      void this.router.navigate([RoutesEnum.Auction]);
    } else {
      this.isFormError = true;
    }
  }

  cancelRegister(): void {
    void this.router.navigate([RoutesEnum.Login]);
  }
}
