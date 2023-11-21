import { Injectable } from '@angular/core';
import { User } from '~/app/shared/models/user/user.model';
import { LocalStorageSubject } from '~/app/shared/stores/local-storage.store'; // Import your LocalStorageSubject implementation

@Injectable({
  providedIn: 'root',
})
export class UserAuthenticatedStoreService {
  userAuthenticated$: LocalStorageSubject<User>;

  constructor() {
    this.userAuthenticated$ = new LocalStorageSubject<User>(
      'userAuthenticated',
      {} as User,
      true,
    );
  }

  resetUserAuthenticated(): void {
    this.userAuthenticated$.next({} as User);
  }

  updateUserAuthenticated(user: User): void {
    this.userAuthenticated$.next(user);
  }

  getConnectedUserEmail(): string {
    return this.userAuthenticated$.getValue().email;
  }

  getConnectUser(): User {
    return this.userAuthenticated$.getValue();
  }

  logout(): void {
    this.userAuthenticated$.next({} as User);
  }
}
