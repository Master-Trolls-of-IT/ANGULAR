import { StateEnum } from '~/app/shared/models/auction/state.enum';
import { AuctionedItemModel } from '~/app/shared/models/auction/auctioned-item.model';
import { Bidder } from '~/app/shared/models/user/bidder.model';

type Product = {
  state: StateEnum;
  initialPrice: number;
  finalPrice?: number;
  localisation: string;
  lastBidder: Pick<
    Bidder,
    'firstname' | 'lastname' | 'profilePicture' | 'email'
  >;
  autoBidder: Bidder;
};

export type AuctionedItemProductModel = AuctionedItemModel & Product;
