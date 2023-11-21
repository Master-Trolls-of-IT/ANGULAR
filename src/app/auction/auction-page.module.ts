import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { SharedModule } from '~/app/shared/shared.module';
import { AuctionPageComponent } from '~/app/auction/pages/auction-page/auction-page.component';
import { AuctionPageRoutingModule } from '~/app/auction/auction-page-routing.module';
import { AuctionedItemComponent } from '~/app/auction/pages/auction-page/component/auctioned-item/auctioned-item.component';
import { CreateAuctionPageComponent } from '~/app/auction/pages/create-auction-page/create-auction-page.component';
import { ProfilePageComponent } from '~/app/auction/pages/profile-page/profile-page.component';
import { UserProfileComponent } from '~/app/auction/pages/profile-page/components/user-profile/user-profile.component';
import { AuctionItemPageComponent } from '~/app/auction/pages/auction-item-page/auction-item-page.component';
import { PurchasesPageComponent } from '~/app/auction/pages/profile-page/components/purchases-page/purchases-page.component';
import { PurchaseItemComponent } from '~/app/auction/pages/profile-page/components/purchases-page/component/purchase-item/purchase-item.component';

@NgModule({
  declarations: [
    AuctionPageComponent,
    AuctionedItemComponent,
    CreateAuctionPageComponent,
    ProfilePageComponent,
    UserProfileComponent,
    PurchasesPageComponent,
    PurchaseItemComponent,
    AuctionItemPageComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AuctionPageRoutingModule,
    NgOptimizedImage,
  ],
  exports: [],
})
export class AuctionPageModule {}
