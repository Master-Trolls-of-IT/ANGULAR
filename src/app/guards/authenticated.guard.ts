import { Router, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { UserAuthenticatedStoreService } from '~/app/shared/stores/user/user-authenticated.store.service';
import { map, Observable, take } from 'rxjs';
import { User } from '~/app/shared/models/user/user.model';
import { RoutesEnum } from '~/app/shared/models/routes/routes.enum';

@Injectable({
  providedIn: 'root',
})
export class AuthenticatedGuard {
  constructor(
    private userAuthenticatedStoreService: UserAuthenticatedStoreService,
    private router: Router,
  ) {}

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.userAuthenticatedStoreService.userAuthenticated$.pipe(
      take(1),
      map((user: User) => {
        if (Object.keys(user).length > 0) {
          return true;
        } else {
          void this.router.navigate([RoutesEnum.Login]);
          return false;
        }
      }),
    );
  }
}
