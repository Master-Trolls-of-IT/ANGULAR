import { AuctionedItemProductModel } from '~/app/shared/models/auction/auctioned-item-product.model';

export interface Preferences {
  arts: boolean;
  books: boolean;
  vehicles: boolean;
}

export interface User {
  id: number;
  firstname: string;
  lastname: string;
  birthdate: Date;
  email: string;
  password: string;
  profilePicture: string;
  preferences: Preferences;
  auctionHistory: AuctionedItemProductModel[];
}
