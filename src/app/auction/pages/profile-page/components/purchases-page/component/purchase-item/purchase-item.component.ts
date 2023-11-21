import { Component, Input } from '@angular/core';
import { AuctionedItemProductModel } from '~/app/shared/models/auction/auctioned-item-product.model';
import { TranslateService } from '@ngx-translate/core';
import { AuctionCategory } from '~/app/shared/models/auction/auction-category.enum';
import { map, Observable, takeWhile, timer } from "rxjs";

@Component({
  selector: 'app-purchase-item',
  templateUrl: './purchase-item.component.html',
  styleUrls: ['./purchase-item.component.css'],
})
export class PurchaseItemComponent {
  @Input() auctionedItem: AuctionedItemProductModel;

  currentIndex: number;
  currentImage: string;
  timeRemaining: Observable<number>;

  constructor(private translateService: TranslateService) {
    this.auctionedItem = {} as AuctionedItemProductModel;

    this.currentIndex = 0;
    this.currentImage = '';

    this.timeRemaining = timer(0, 1000).pipe(
      map((n) => (this.auctionedItem.time - n) * 1000),
      takeWhile((n) => n >= 0),
    );
  }

  ngOnInit(): void {
    this.currentImage = this.auctionedItem.photos[0].src.original;
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
}
