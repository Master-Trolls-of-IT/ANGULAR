import { Component, Input, OnInit } from '@angular/core';
import { Photo } from '~/app/shared/services/api/interface/APIResponse.interface';
import { AuctionCategory } from '~/app/shared/models/auction/auction-category.enum';
import { TranslateService } from '@ngx-translate/core';
import { StateEnum } from '~/app/shared/models/auction/state.enum';
import { AuctionedItemProductModel } from '~/app/shared/models/auction/auctioned-item-product.model';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
})
export class SummaryComponent implements OnInit {
  @Input() auctionItem: AuctionedItemProductModel;
  photos: Photo[];

  constructor(private translateService: TranslateService) {
    this.auctionItem = {} as AuctionedItemProductModel;
    this.photos = [];
  }

  ngOnInit(): void {
    this.photos = this.auctionItem.photos;
  }

  get chooseRightCategory(): string {
    switch (this.auctionItem.category) {
      case AuctionCategory.Art:
        return this.translateService.instant('pages.auction.arts');
      case AuctionCategory.Books:
        return this.translateService.instant('pages.auction.books');
      default:
        return this.translateService.instant('pages.auction.vehicles');
    }
  }

  get chooseRightState(): string {
    switch (this.auctionItem.state) {
      case StateEnum.Poor:
        return this.translateService.instant('form.state.poor');
      case StateEnum.Good:
        return this.translateService.instant('form.state.good');
      case StateEnum.VeryGood:
        return this.translateService.instant('form.state.very-good');
      default:
        return this.translateService.instant('form.state.new');
    }
  }
}
