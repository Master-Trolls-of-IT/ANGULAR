import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { UserAuthenticatedStoreService } from '~/app/shared/stores/user/user-authenticated.store.service';
import { User } from '~/app/shared/models/user/user.model';
import { RoutesEnum } from '~/app/shared/models/routes/routes.enum';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  userAuthenticated: User = {} as User;
  showHeader: boolean = true;
  isUserAuthenticated: boolean;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userAuthenticatedStoreService: UserAuthenticatedStoreService,
  ) {
    this.isUserAuthenticated = false;

    this.userAuthenticatedStoreService.userAuthenticated$.subscribe(
      (user: User) => {
        if (Object.keys(user).length > 0) {
          this.userAuthenticated = user;
          this.isUserAuthenticated = true;
        } else {
          this.isUserAuthenticated = false;
          void this.router.navigate([RoutesEnum.Login]);
        }
      },
    );
  }

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.showHeader =
          !this.activatedRoute.firstChild?.snapshot.data?.['hideHeader'];
      });
  }

  goHome(): void {
    void this.router.navigate([RoutesEnum.Auction]);
  }

  createAuction(): void {
    void this.router.navigate([RoutesEnum.CreateAuction]);
  }

  openProfile(): void {
    void this.router.navigate([RoutesEnum.Profile]);
  }
}
