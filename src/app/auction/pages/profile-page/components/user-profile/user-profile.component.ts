import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ageValidator } from '~/app/shared/utils/age-validator.utils';
import { User } from '~/app/shared/models/user/user.model';
import { UserAuthenticatedStoreService } from '~/app/shared/stores/user/user-authenticated.store.service';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { ModalComponent } from '~/app/shared/components/modal/modal.component';
import { ToasterService } from '~/app/shared/services/toaster.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  @Input() user!: User;

  form: FormGroup;
  isFormError: boolean = false;
  today: Date = new Date();

  constructor(
    private formBuilder: FormBuilder,
    private userAuthenticatedStoreService: UserAuthenticatedStoreService,
    private dialog: MatDialog,
    private translateService: TranslateService,
    private toasterService: ToasterService,
  ) {
    this.form = this.formBuilder.group({});
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      firstname: [
        this.user?.firstname,
        Validators.compose([Validators.minLength(3)]),
      ],
      lastname: [
        this.user?.lastname,
        Validators.compose([Validators.minLength(3)]),
      ],
      birthdate: [
        this.user?.birthdate ? new Date(this.user.birthdate) : null,
        [Validators.required, ageValidator(18)],
      ],
      email: [this.user?.email, Validators.compose([Validators.email])],
      password: [this.user?.password, Validators.required],
      profilePicture: [this.user?.profilePicture],
      arts: [this.user?.preferences.arts],
      books: [this.user?.preferences.books],
      vehicles: [this.user?.preferences.vehicles],
    });
  }

  onSubmit(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: {
        title: this.translate('modal.confirmation.label'),
        message: this.translate('modal.confirmation.message'),
      },
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        if (this.form.valid) {
          this.userAuthenticatedStoreService.updateUserAuthenticated({
            ...this.form.value,
            preferences: {
              arts: this.form.value.arts,
              books: this.form.value.books,
              vehicles: this.form.value.vehicles,
            },
          });
          this.toasterService.showSuccess(
            'profile-save',
            this.translateService.instant(
              'toaster.success.save-change.summary',
            ),
            this.translateService.instant('toaster.success.save-change.detail'),
          );
        } else {
          this.isFormError = true;
        }
      }
    });
  }

  cancelEdit(): void {
    this.form.patchValue({
      firstname: this.user?.firstname,
      lastname: this.user?.lastname,
      birthdate: this.user?.birthdate ? new Date(this.user.birthdate) : null,
      email: this.user?.email,
      password: this.user?.password,
      profilePicture: this.user?.profilePicture,
      arts: this.user?.preferences.arts,
      books: this.user?.preferences.books,
      vehicles: this.user?.preferences.vehicles,
    });
    this.toasterService.showInfo(
      'profile-save',
      this.translateService.instant('toaster.info.cancel-change.summary'),
      this.translateService.instant('toaster.info.cancel-change.detail'),
    );
  }

  translate(text: string): string {
    return this.translateService.instant(text);
  }
}
