import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuctionPageComponent } from '~/app/auction/pages/auction-page/auction-page.component';
import { CreateAuctionPageComponent } from '~/app/auction/pages/create-auction-page/create-auction-page.component';
import { ProfilePageComponent } from '~/app/auction/pages/profile-page/profile-page.component';
import { AuctionItemPageComponent } from '~/app/auction/pages/auction-item-page/auction-item-page.component';

const routes: Routes = [
  { path: '', component: AuctionPageComponent },
  { path: 'create', component: CreateAuctionPageComponent },
  { path: 'profile', component: ProfilePageComponent },
  { path: ':id', component: AuctionItemPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuctionPageRoutingModule {}
