import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { map, Observable, Subscription, takeWhile, timer } from 'rxjs';
import { AuctionCategory } from '~/app/shared/models/auction/auction-category.enum';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { RoutesEnum } from '~/app/shared/models/routes/routes.enum';
import { AuctionedItemProductModel } from '~/app/shared/models/auction/auctioned-item-product.model';
import { AuctionStoreService } from '~/app/shared/stores/auction/auction.store.service';

@Component({
  selector: 'app-auctioned-item',
  templateUrl: './auctioned-item.component.html',
  styleUrls: ['./auctioned-item.component.css'],
})
export class AuctionedItemComponent implements OnInit, OnDestroy {
  @Input() auctionedItem: AuctionedItemProductModel;
  @Input() setAuctionedItems: (
    auctionedItemProductModel: AuctionedItemProductModel[],
  ) => void;

  currentIndex: number;
  currentImage: string;
  timeRemaining: Observable<number> = new Observable<number>();
  private timerSubscription: Subscription = new Subscription();

  constructor(
    private translateService: TranslateService,
    private router: Router,
    private auctionStoreService: AuctionStoreService,
  ) {
    this.auctionedItem = {} as AuctionedItemProductModel;
    this.setAuctionedItems = (): void => {};
    this.currentIndex = 0;
    this.currentImage = '';
  }

  ngOnInit(): void {
    this.currentImage = this.auctionedItem.photos[0].src.original;

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
    const isAuctionSold =
      this.auctionedItem.currentPrice !== this.auctionedItem.initialPrice;
    this.auctionStoreService.terminateAuctionTimer(
      this.auctionedItem.id,
      isAuctionSold,
    );

    this.auctionStoreService.auctionItems$.subscribe((items) => {
      this.setAuctionedItems(items);
    });
  }

  goNextImage(): void {
    this.currentIndex =
      (this.currentIndex + 1) % this.auctionedItem.photos.length;
    this.currentImage =
      this.auctionedItem.photos[this.currentIndex].src.original;
  }

  goPreviousImage(): void {
    this.currentIndex =
      (this.currentIndex - 1 + this.auctionedItem.photos.length) %
      this.auctionedItem.photos.length;
    this.currentImage =
      this.auctionedItem.photos[this.currentIndex].src.original;
  }

  chooseRightCategory(): string {
    switch (this.auctionedItem.category) {
      case AuctionCategory.Art:
        return this.translateService.instant('pages.auction.arts');
      case AuctionCategory.Books:
        return this.translateService.instant('pages.auction.books');
      case AuctionCategory.Vehicles:
        return this.translateService.instant('pages.auction.vehicles');
    }
  }

  onClickItem(): void {
    void this.router.navigate([RoutesEnum.Auction, this.auctionedItem.id]);
  }
}
