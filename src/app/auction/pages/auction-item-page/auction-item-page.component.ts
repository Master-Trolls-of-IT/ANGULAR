import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuctionStoreService } from '~/app/shared/stores/auction/auction.store.service';
import { AuctionedItemProductModel } from '~/app/shared/models/auction/auctioned-item-product.model';
import { map, Observable, Subscription, takeWhile, timer } from 'rxjs';
import { RoutesEnum } from '~/app/shared/models/routes/routes.enum';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '~/app/shared/models/user/user.model';
import { UserAuthenticatedStoreService } from '~/app/shared/stores/user/user-authenticated.store.service';

@Component({
  selector: 'app-auction-item-page',
  templateUrl: './auction-item-page.component.html',
  styleUrls: ['./auction-item-page.component.css'],
})
export class AuctionItemPageComponent implements OnInit, OnDestroy {
  form: FormGroup;
  auctionItemID: number = 0;
  auctionedItem: AuctionedItemProductModel;
  user: User;

  timeRemaining: Observable<number> = new Observable<number>();
  private timerSubscription: Subscription = new Subscription();

  isFormError: boolean;

  constructor(
    private auctionStoreService: AuctionStoreService,
    private userAuthenticatedStoreService: UserAuthenticatedStoreService,
    route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {
    route.params.subscribe((params) => {
      this.auctionItemID = parseInt(params['id']);
    });

    this.user = {} as User;
    this.isFormError = false;

    this.auctionedItem = auctionStoreService.getAuctionItemById(
      this.auctionItemID,
    ) as AuctionedItemProductModel;

    this.userAuthenticatedStoreService.userAuthenticated$.subscribe(
      (user: User) => {
        this.user = user;
      },
    );

    console.log(this.auctionedItem);

    this.form = this.formBuilder.group({
      currentPrice: [
        this.auctionedItem.currentPrice + 1,
        [Validators.pattern(/^\d+$/)],
      ],
      autoBid: [
        this.auctionedItem.currentPrice + 1,
        [Validators.pattern(/^\d+$/)],
      ],
    });
  }

  ngOnInit(): void {
    this.startTimer();
  }

  ngOnDestroy(): void {
    this.stopTimer();
  }

  startTimer(): void {
    const initialTimeRemaining = this.auctionedItem.time;

    this.timeRemaining = timer(0, 1000).pipe(
      map((n) => {
        const timeRemaining = initialTimeRemaining - n;
        if (timeRemaining <= 0) {
          this.onTimerEnds();
        }
        return timeRemaining * 1000;
      }),
      takeWhile((n) => n >= 0),
    );
  }

  stopTimer(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  onTimerEnds(): void {
    void this.router.navigate([RoutesEnum.Auction]);
  }

  onClickBidButton(): void {
    const newPrice = Number(this.form.get('currentPrice')?.value);
    if (!newPrice || newPrice <= this.auctionedItem.currentPrice) {
      this.isFormError = true;
    } else {
      this.auctionStoreService.bidAction(this.auctionItemID, newPrice);
      this.auctionedItem.currentPrice = newPrice;
      this.isFormError = false;
    }
  }

  onClickBuyNowButton(): void {
    this.auctionStoreService.buyNow(this.auctionItemID);
  }

  onClickAutoBidding(): void {
    const newPrice = Number(this.form.get('autoBid')?.value);
    if (!newPrice || newPrice <= this.auctionedItem.currentPrice) {
      this.isFormError = true;
    } else {
      this.auctionStoreService.bidAction(this.auctionItemID, newPrice);
      this.auctionedItem.currentPrice++;
      this.isFormError = false;
    }
  }
}
