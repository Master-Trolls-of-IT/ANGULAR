import { Component, OnInit } from '@angular/core';
import { AuctionStoreService } from '~/app/shared/stores/auction/auction.store.service';
import { UserAuthenticatedStoreService } from '~/app/shared/stores/user/user-authenticated.store.service';
import { User } from '~/app/shared/models/user/user.model';
import { AuctionedItemProductModel } from '~/app/shared/models/auction/auctioned-item-product.model';

@Component({
  selector: 'app-home-page',
  templateUrl: './auction-page.component.html',
  styleUrls: ['./auction-page.component.css'],
})
export class AuctionPageComponent implements OnInit {
  auctionedItems: AuctionedItemProductModel[] | undefined;
  searchText: string;
  user: User;

  constructor(
    private auctionStoreService: AuctionStoreService,
    private userAuthenticatedStoreService: UserAuthenticatedStoreService,
  ) {
    this.user = {} as User;
    this.auctionedItems = [];

    this.searchText = '';
  }

  ngOnInit(): void {
    this.userAuthenticatedStoreService.userAuthenticated$.subscribe(
      (user: User) => (this.user = user),
    );

    this.auctionedItems = this.auctionStoreService.getAuctionItems(this.user);
  }

  setAuctionedItems(
    auctionedItemProductModel: AuctionedItemProductModel[],
  ): void {
    this.auctionedItems = auctionedItemProductModel;
  }

  get filteredAuctionedItems(): AuctionedItemProductModel[] {
    if (this.auctionedItems != undefined) {
      return this.auctionedItems.filter(
        (auctionedItem: AuctionedItemProductModel) => {
          const searchInName = auctionedItem.title
            .toLowerCase()
            .includes(this.searchText.toLowerCase());
          const searchInDescription = auctionedItem.description
            .toLowerCase()
            .includes(this.searchText.toLowerCase());

          return searchInName || searchInDescription;
        },
      );
    }
    return [];
  }
}
