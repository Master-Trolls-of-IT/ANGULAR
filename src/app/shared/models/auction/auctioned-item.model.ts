import { AuctionCategory } from '~/app/shared/models/auction/auction-category.enum';
import { Photo } from '~/app/shared/services/api/interface/APIResponse.interface';

export type AuctionedItemModel = {
  id: number;
  creator: string;
  title: string;
  description: string;
  category: AuctionCategory;
  currentPrice: number;
  time: number;
  photos: Photo[];
};
