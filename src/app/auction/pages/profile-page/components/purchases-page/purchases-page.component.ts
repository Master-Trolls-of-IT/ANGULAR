import { Component, Input, OnInit } from '@angular/core';
import { AuctionedItemProductModel } from '~/app/shared/models/auction/auctioned-item-product.model';

@Component({
  selector: 'app-purchases-page',
  templateUrl: './purchases-page.component.html',
  styleUrls: ['./purchases-page.component.css'],
})
export class PurchasesPageComponent implements OnInit {
  @Input() auctionedItems: AuctionedItemProductModel[];

  constructor() {
    this.auctionedItems = [];
  }

  ngOnInit(): void {}
}
