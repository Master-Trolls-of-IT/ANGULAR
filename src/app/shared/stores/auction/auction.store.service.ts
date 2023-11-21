import { Injectable } from '@angular/core';
import { BehaviorSubject, take } from 'rxjs';
import { AuctionItemMockedData } from '~/app/shared/stores/mocked-data/auction-items/auction-item-mocked-data';
import { AuctionedItemProductModel } from '~/app/shared/models/auction/auctioned-item-product.model';
import { UserAuthenticatedStoreService } from '~/app/shared/stores/user/user-authenticated.store.service';
import { UserStoreService } from '~/app/shared/stores/user/user.store.service';
import { Bidder } from '~/app/shared/models/user/bidder.model';
import { User } from '~/app/shared/models/user/user.model';
import { AuctionCategory } from '~/app/shared/models/auction/auction-category.enum';
import { LocalStorageSubject } from '~/app/shared/stores/local-storage.store';

@Injectable({
  providedIn: 'root',
})
export class AuctionStoreService {
  private auctionItemsSubject = new LocalStorageSubject<
    AuctionedItemProductModel[]
  >('auctionItems', AuctionItemMockedData, true);
  auctionItems$ = this.auctionItemsSubject.asObservable();

  constructor(
    private userAuthenticatedStoreService: UserAuthenticatedStoreService,
    private userStoreService: UserStoreService,
  ) {}

  getAuctionItems(user: User): AuctionedItemProductModel[] {
    const newAuctionedItemProduct = [] as AuctionedItemProductModel[];
    this.auctionItemsSubject.subscribe((items: AuctionedItemProductModel[]) => {
      items.map((item: AuctionedItemProductModel) => {
        if (item.creator != user.email && this.checkPreferences(user, item)) {
          newAuctionedItemProduct.push(item);
        }
      });
    });
    return newAuctionedItemProduct;
  }

  getUserAuctionItem(user: User): AuctionedItemProductModel[] {
    const newAuctionedItemProduct = [] as AuctionedItemProductModel[];
    this.auctionItemsSubject.subscribe((items: AuctionedItemProductModel[]) => {
      items.map((item: AuctionedItemProductModel) => {
        if (item.creator === user.email) {
          newAuctionedItemProduct.push(item);
        }
      });
    });
    return newAuctionedItemProduct;
  }

  addAuctionItem(auctionedItemModel: AuctionedItemProductModel): void {
    const currentAuctionItems: AuctionedItemProductModel[] =
      this.auctionItemsSubject.getValue();
    this.auctionItemsSubject.next([...currentAuctionItems, auctionedItemModel]);
  }

  getAuctionItemById(id: number): AuctionedItemProductModel | undefined {
    let auctionItem: AuctionedItemProductModel | undefined;
    this.auctionItems$.subscribe((items) => {
      auctionItem = items.find((item) => item.id == id);
    });
    return auctionItem;
  }

  bidAction(id: number, newPrice: number): boolean {
    const connectedUser = this.userAuthenticatedStoreService.getConnectUser();
    const newLastBidder = { ...connectedUser } as Pick<
      Bidder,
      'lastname' | 'firstname' | 'profilePicture' | 'email'
    >;
    let isSuccess = false;
    this.auctionItemsSubject.pipe(take(1)).subscribe((items) => {
      const updatedItems = items.map((item) => {
        if (item.id != id) {
          return item;
        }
        isSuccess = true;
        if (
          Object.keys(item.autoBidder).length == 0 ||
          item.autoBidder.autoBidMaxPrice <= newPrice
        ) {
          return {
            ...item,
            currentPrice: newPrice,
            lastBidder: newLastBidder,
            autoBidder: {} as Bidder,
          } as AuctionedItemProductModel;
        }
        return {
          ...item,
          currentPrice: newPrice + 1,
          lastBidder: item.autoBidder,
        } as AuctionedItemProductModel;
      });

      this.auctionItemsSubject.next(updatedItems);
    });
    return isSuccess;
  }

  buyNow(id: number): void {
    const connectedUserEmail =
      this.userAuthenticatedStoreService.getConnectedUserEmail();
    const newHistoryItemProductModel =
      this.getAuctionItemById(id) ?? ({} as AuctionedItemProductModel);

    this.userStoreService.addAuctionPurchase(
      connectedUserEmail,
      newHistoryItemProductModel,
    );
    this.terminateAuctionItem(id);
  }

  addAutoBidding(id: number, newPrice: number): void {
    const connectedUser = this.userAuthenticatedStoreService.getConnectUser();

    const updatedItems = this.auctionItemsSubject.getValue().map((item) => {
      if (item.id !== id) {
        return item;
      }

      const newLastBidder: Bidder = {
        ...connectedUser,
        autoBidMaxPrice: newPrice,
      };

      if (Object.keys(item.autoBidder).length == 0) {
        return {
          ...item,
          currentPrice: item.currentPrice + 1,
          lastBidder: { ...newLastBidder },
          autoBidder: newLastBidder,
        } as AuctionedItemProductModel;
      }

      const lowerPrice = Math.min(item.autoBidder.autoBidMaxPrice, newPrice);

      if (lowerPrice === newPrice) {
        return {
          ...item,
          currentPrice: lowerPrice + 1,
          lastBidder: { ...item.autoBidder },
        };
      } else {
        return {
          ...item,
          currentPrice: item.autoBidder.autoBidMaxPrice + 1,
          lastBidder: { ...newLastBidder },
          autoBidder: newLastBidder,
        } as AuctionedItemProductModel;
      }
    });

    this.auctionItemsSubject.next(updatedItems);
  }

  terminateAuctionTimer(id: number, sold: boolean): void {
    if (!sold) {
      this.terminateAuctionItem(id);
    } else {
      const connectedUserEmail =
        this.userAuthenticatedStoreService.getConnectedUserEmail();
      const newHistoryItemProductModel =
        this.getAuctionItemById(id) ?? ({} as AuctionedItemProductModel);
      this.userStoreService.addAuctionPurchase(
        connectedUserEmail,
        newHistoryItemProductModel,
        false,
      );
      this.terminateAuctionItem(id);
    }
  }

  private terminateAuctionItem(id: number): void {
    const updatedAuctionItems = this.auctionItemsSubject
      .getValue()
      .filter((item) => item.id != id);
    this.auctionItemsSubject.next(updatedAuctionItems);
  }

  private checkPreferences(
    user: User,
    item: AuctionedItemProductModel,
  ): boolean {
    if (Object.values(user.preferences).every((value) => value === false))
      return true;

    switch (item.category) {
      case AuctionCategory.Art:
        return user.preferences.arts;
      case AuctionCategory.Books:
        return user.preferences.books;
      default:
        return user.preferences.vehicles;
    }
  }

  updateAuctionItemTimer(id: number, number: number): void {
    this.auctionItemsSubject.subscribe((items) => {
      const updatedItems = items.map((item) => {
        if (item.id === id) {
          item.time = number;
        }
        return item;
      });
      this.auctionItemsSubject.next(updatedItems);
    });
  }
}
