import { Injectable } from '@angular/core';
import { User } from '~/app/shared/models/user/user.model';
import { BehaviorSubject } from 'rxjs';
import { usersMockedData } from '~/app/shared/stores/mocked-data/users/user-mocked-data';
import { UserAuthenticatedStoreService } from '~/app/shared/stores/user/user-authenticated.store.service';
import { AuctionedItemProductModel } from '~/app/shared/models/auction/auctioned-item-product.model';
import { compareStringUtils } from '~/app/shared/utils/compare-string.utils';

@Injectable({
  providedIn: 'root',
})
export class UserStoreService {
  private usersSubject = new BehaviorSubject<User[]>([]);
  users$ = this.usersSubject.asObservable();

  constructor(
    private userAuthenticatedStoreService: UserAuthenticatedStoreService,
  ) {
    this.usersSubject.next(usersMockedData);
  }

  updateUserAuthenticated(email: string, password: string): void {
    let isFound: boolean = false;
    this.usersSubject.subscribe((users: User[]) => {
      users.map((user: User) => {
        if (
          compareStringUtils(user.email, email) &&
          compareStringUtils(user.password, password)
        ) {
          this.userAuthenticatedStoreService.updateUserAuthenticated(user);
          isFound = true;
        }
      });
    });

    if (!isFound) {
      this.userAuthenticatedStoreService.resetUserAuthenticated();
    }
  }

  addUser(user: User): void {
    const currentUsers = this.usersSubject.getValue();
    this.usersSubject.next([...currentUsers, user]);
    this.userAuthenticatedStoreService.updateUserAuthenticated(user);
  }

  addAuctionPurchase(
    email: string,
    newItemProductModel: AuctionedItemProductModel,
    isInstantPurchase: boolean = true,
  ): void {
    const updatedUsers = this.usersSubject.getValue().map((user) => {
      if (user.email === email) {
        const updatedHistory = [
          ...user.auctionHistory,
          {
            ...newItemProductModel,
            currentPrice: newItemProductModel.finalPrice,
            finalPrice: isInstantPurchase
              ? newItemProductModel.finalPrice
              : newItemProductModel.currentPrice,
            lastBidder: { ...user },
          } as AuctionedItemProductModel,
        ];
        return { ...user, auctionHistory: updatedHistory };
      }
      return user;
    });
    this.usersSubject.next(updatedUsers);
  }

  isExistingEmail(email: string): boolean {
    const users = this.usersSubject.getValue();
    const existingEmail = users.find((user) => {
      return user.email == email;
    });
    return existingEmail != undefined;
  }
}
