import { Component } from '@angular/core';
import { User } from '~/app/shared/models/user/user.model';
import { UserAuthenticatedStoreService } from '~/app/shared/stores/user/user-authenticated.store.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '~/app/shared/components/modal/modal.component';
import { TranslateService } from '@ngx-translate/core';
import { ToasterService } from '~/app/shared/services/toaster.service';
import { MessageService } from 'primeng/api';
import { AuctionedItemProductModel } from '~/app/shared/models/auction/auctioned-item-product.model';
import { AuctionStoreService } from '~/app/shared/stores/auction/auction.store.service';
import { LangEnum } from '~/app/shared/models/translate/lang.enum';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
  providers: [ToasterService, MessageService],
})
export class ProfilePageComponent {
  user: User;
  selectedTab: string;
  userAuctions: AuctionedItemProductModel[];
  language: string;

  constructor(
    private userAuthenticatedStoreService: UserAuthenticatedStoreService,
    private auctionStoreService: AuctionStoreService,
    private dialog: MatDialog,
    private translateService: TranslateService,
  ) {
    this.user = {} as User;
    this.selectedTab = 'profile';
    this.userAuctions = [{} as AuctionedItemProductModel];
    this.language = LangEnum.FR;

    this.userAuthenticatedStoreService.userAuthenticated$.subscribe(
      (user: User) => {
        if (Object.keys(user).length > 0) {
          this.user = user;
        }
      },
    );

    this.userAuctions = this.auctionStoreService.getUserAuctionItem(this.user);
  }

  selectTab(tab: string): void {
    this.selectedTab = tab;
  }

  logout(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: {
        title: this.translateService.instant('modal.logout.label'),
        message: this.translateService.instant('modal.logout.message'),
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.userAuthenticatedStoreService.logout();
      }
    });
  }

  changeLanguage(): void {
    this.language = this.language === LangEnum.FR ? LangEnum.EN : LangEnum.FR;
    this.translateService.use(this.language);
  }
}
