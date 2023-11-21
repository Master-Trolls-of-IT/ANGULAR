import { User } from '~/app/shared/models/user/user.model';
import { AuctionedItemProductModel } from '~/app/shared/models/auction/auctioned-item-product.model';
import { AuctionCategory } from '~/app/shared/models/auction/auction-category.enum';
import { StateEnum } from '~/app/shared/models/auction/state.enum';
import { Bidder } from '~/app/shared/models/user/bidder.model';

export const usersMockedData: User[] = [
  {
    id: 1,
    firstname: 'John',
    lastname: 'Doe',
    birthdate: new Date('1990-01-15'),
    email: 'john.doe@example.com',
    password: 'john',
    profilePicture: 'avatar-suit-man.svg',
    preferences: { arts: true, books: true, vehicles: true },
    auctionHistory: [
      {
        id: 6151,
        creator: 'john.doe@example.com',
        category: AuctionCategory.Art,
        description: "It's a beautiful painting 1",
        currentPrice: 50,
        time: 200,
        title: 'Painting 1',
        photos: [
          {
            id: 3,
            src: {
              original:
                'https://images.pexels.com/photos/3687770/pexels-photo-3687770.jpeg',
            },
            alt: 'Painting 1 Image',
          },
          {
            id: 2,
            src: {
              original:
                'https://images.pexels.com/photos/2607544/pexels-photo-2607544.jpeg',
            },
            alt: 'Car 1 Image',
          },
        ],
        state: StateEnum.VeryGood,
        initialPrice: 30,
        finalPrice: 50,
        localisation: 'Location 2',
        lastBidder: {
          firstname: 'Jane',
          lastname: 'Smith',
          profilePicture: 'avatar-red-woman.svg',
          email: 'jane.smith@example.com',
        },
        autoBidder: {} as Bidder,
      },
      {
        id: 6151,
        creator: 'john.doe@example.com',
        category: AuctionCategory.Art,
        description: "It's a beautiful painting 1",
        currentPrice: 50,
        time: 200,
        title: 'Painting 1',
        photos: [
          {
            id: 3,
            src: {
              original:
                'https://images.pexels.com/photos/3687770/pexels-photo-3687770.jpeg',
            },
            alt: 'Painting 1 Image',
          },
          {
            id: 2,
            src: {
              original:
                'https://images.pexels.com/photos/2607544/pexels-photo-2607544.jpeg',
            },
            alt: 'Car 1 Image',
          },
        ],
        state: StateEnum.VeryGood,
        initialPrice: 50,
        finalPrice: 50,
        localisation: 'Location 2',
        lastBidder: {
          firstname: 'Jane',
          lastname: 'Smith',
          profilePicture: 'avatar-red-woman.svg',
          email: 'jane.smith@example.com',
        },
        autoBidder: {} as Bidder,
      },
      {
        id: 6151,
        creator: 'john.doe@example.com',
        category: AuctionCategory.Art,
        description: "It's a beautiful painting 1",
        currentPrice: 200,
        time: 200,
        title: 'Painting 1',
        photos: [
          {
            id: 3,
            src: {
              original:
                'https://images.pexels.com/photos/3687770/pexels-photo-3687770.jpeg',
            },
            alt: 'Painting 1 Image',
          },
          {
            id: 2,
            src: {
              original:
                'https://images.pexels.com/photos/2607544/pexels-photo-2607544.jpeg',
            },
            alt: 'Car 1 Image',
          },
        ],
        state: StateEnum.VeryGood,
        initialPrice: 50,
        finalPrice: 200,
        localisation: 'Location 2',
        lastBidder: {
          firstname: 'Jane',
          lastname: 'Smith',
          profilePicture: 'avatar-red-woman.svg',
          email: 'jane.smith@example.com',
        },
        autoBidder: {} as Bidder,
      },
      {
        id: 6151,
        creator: 'john.doe@example.com',
        category: AuctionCategory.Art,
        description: "It's a beautiful painting 1",
        currentPrice: 150,
        time: 200,
        title: 'Painting 1',
        photos: [
          {
            id: 3,
            src: {
              original:
                'https://images.pexels.com/photos/3687770/pexels-photo-3687770.jpeg',
            },
            alt: 'Painting 1 Image',
          },
          {
            id: 2,
            src: {
              original:
                'https://images.pexels.com/photos/2607544/pexels-photo-2607544.jpeg',
            },
            alt: 'Car 1 Image',
          },
        ],
        state: StateEnum.VeryGood,
        initialPrice: 50,
        finalPrice: 150,
        localisation: 'Location 2',
        lastBidder: {
          firstname: 'Jane',
          lastname: 'Smith',
          profilePicture: 'avatar-red-woman.svg',
          email: 'jane.smith@example.com',
        },
        autoBidder: {} as Bidder,
      },
      {
        id: 6151,
        creator: 'john.doe@example.com',
        category: AuctionCategory.Art,
        description: "It's a beautiful painting 1",
        currentPrice: 25,
        time: 200,
        title: 'Painting 1',
        photos: [
          {
            id: 3,
            src: {
              original:
                'https://images.pexels.com/photos/3687770/pexels-photo-3687770.jpeg',
            },
            alt: 'Painting 1 Image',
          },
          {
            id: 2,
            src: {
              original:
                'https://images.pexels.com/photos/2607544/pexels-photo-2607544.jpeg',
            },
            alt: 'Car 1 Image',
          },
        ],
        state: StateEnum.VeryGood,
        initialPrice: 0,
        finalPrice: 25,
        localisation: 'Location 2',
        lastBidder: {
          firstname: 'Jane',
          lastname: 'Smith',
          profilePicture: 'avatar-red-woman.svg',
          email: 'jane.smith@example.com',
        },
        autoBidder: {} as Bidder,
      },
      {
        id: 6151,
        creator: 'john.doe@example.com',
        category: AuctionCategory.Art,
        description: "It's a beautiful painting 1",
        currentPrice: 1000,
        time: 200,
        title: 'Painting 1',
        photos: [
          {
            id: 3,
            src: {
              original:
                'https://images.pexels.com/photos/3687770/pexels-photo-3687770.jpeg',
            },
            alt: 'Painting 1 Image',
          },
          {
            id: 2,
            src: {
              original:
                'https://images.pexels.com/photos/2607544/pexels-photo-2607544.jpeg',
            },
            alt: 'Car 1 Image',
          },
        ],
        state: StateEnum.VeryGood,
        initialPrice: 50,
        finalPrice: 1000,
        localisation: 'Location 2',
        lastBidder: {
          firstname: 'Jane',
          lastname: 'Smith',
          profilePicture: 'avatar-red-woman.svg',
          email: 'jane.smith@example.com',
        },
        autoBidder: {} as Bidder,
      },
      {
        id: 6151,
        creator: 'john.doe@example.com',
        category: AuctionCategory.Art,
        description: "It's a beautiful painting 1",
        currentPrice: 132,
        time: 200,
        title: 'Painting 1',
        photos: [
          {
            id: 3,
            src: {
              original:
                'https://images.pexels.com/photos/3687770/pexels-photo-3687770.jpeg',
            },
            alt: 'Painting 1 Image',
          },
          {
            id: 2,
            src: {
              original:
                'https://images.pexels.com/photos/2607544/pexels-photo-2607544.jpeg',
            },
            alt: 'Car 1 Image',
          },
        ],
        state: StateEnum.VeryGood,
        initialPrice: 50,
        finalPrice: 132,
        localisation: 'Location 2',
        lastBidder: {
          firstname: 'Jane',
          lastname: 'Smith',
          profilePicture: 'avatar-red-woman.svg',
          email: 'jane.smith@example.com',
        },
        autoBidder: {} as Bidder,
      },
    ],
  },
  {
    id: 2,
    firstname: 'Jane',
    lastname: 'Smith',
    birthdate: new Date('1985-07-22'),
    email: 'jane.smith@example.com',
    password: 'jane',
    profilePicture: 'avatar-red-woman.svg',
    preferences: { arts: true, books: true, vehicles: false },
    auctionHistory: [] as AuctionedItemProductModel[],
  },
  {
    id: 3,
    firstname: 'Alice',
    lastname: 'Johnson',
    birthdate: new Date('1995-03-10'),
    email: 'alice.johnson@example.com',
    password: 'alice',
    profilePicture: 'avatar-red-woman.svg',
    preferences: { arts: false, books: false, vehicles: true },
    auctionHistory: [] as AuctionedItemProductModel[],
  },
  {
    id: 4,
    firstname: 'Bob',
    lastname: 'Wilson',
    birthdate: new Date('1988-11-05'),
    email: 'bob.wilson@example.com',
    password: 'bob',
    profilePicture: 'avatar-glass-man.svg',
    preferences: { arts: true, books: false, vehicles: false },
    auctionHistory: [] as AuctionedItemProductModel[],
  },
  {
    id: 5,
    firstname: 'Emily',
    lastname: 'Brown',
    birthdate: new Date('1992-09-30'),
    email: 'emily.brown@example.com',
    password: 'emily',
    profilePicture: 'avatar-glass-woman.svg',
    preferences: { arts: false, books: false, vehicles: false },
    auctionHistory: [] as AuctionedItemProductModel[],
  },
];
