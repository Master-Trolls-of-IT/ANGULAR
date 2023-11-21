import { UserStoreService } from '~/app/shared/stores/user/user.store.service';
import { User } from '~/app/shared/models/user/user.model';
import { compareStringUtils } from '~/app/shared/utils/compare-string.utils';
import { UserAuthenticatedStoreService } from '~/app/shared/stores/user/user-authenticated.store.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private userStoreService: UserStoreService,
    private userAuthenticatedStoreService: UserAuthenticatedStoreService,
  ) {}

  login(email: string, password: string): void {
    this.userStoreService.updateUserAuthenticated(email, password);
  }
}
