import { User } from '~/app/shared/models/user/user.model';

export type Bidder = Pick<
  User,
  'lastname' | 'firstname' | 'profilePicture' | 'email'
> & {
  autoBidMaxPrice: number;
};
