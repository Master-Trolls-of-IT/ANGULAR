import { AuctionedItemProductModel } from '~/app/shared/models/auction/auctioned-item-product.model';
import { AuctionCategory } from '~/app/shared/models/auction/auction-category.enum';
import { StateEnum } from '~/app/shared/models/auction/state.enum';
import { Bidder } from '~/app/shared/models/user/bidder.model';

export const AuctionItemMockedData: AuctionedItemProductModel[] = [
  {
    id: 1,
    creator: 'jane.smith@example.com',
    category: AuctionCategory.Vehicles,
    description: "It's a beautiful car 1",
    currentPrice: 29,
    time: 10,
    title: 'Car 1',
    photos: [
      {
        id: 1,
        src: {
          original:
            'https://images.pexels.com/photos/3687770/pexels-photo-3687770.jpeg',
        },
        alt: 'Car 1 Image',
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
    state: StateEnum.New,
    initialPrice: 29,
    finalPrice: 100,
    localisation: 'Location 1',
    lastBidder: {
      firstname: 'Alice',
      lastname: 'Johnson',
      profilePicture: 'avatar-suit-man.svg',
      email: 'alice.johnson@example.com',
    },
    autoBidder: {
      ...{
        firstname: 'Jane',
        lastname: 'Smith',
        profilePicture: 'avatar-red-woman.svg',
        email: 'jane.smith@example.com',
      },
      autoBidMaxPrice: 50,
    } as Bidder,
  },
  {
    id: 2,
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
    id: 3,
    creator: 'bob.wilson@example.com',
    category: AuctionCategory.Books,
    description: "It's a beautiful book 1",
    currentPrice: 20,
    time: 120,
    title: 'Book 1',
    photos: [
      {
        id: 4,
        src: {
          original:
            'https://images.pexels.com/photos/3687770/pexels-photo-3687770.jpeg',
        },
        alt: 'Book 1 Image',
      },
    ],
    state: StateEnum.Good,
    initialPrice: 20,
    finalPrice: 0,
    localisation: 'Location 3',
    lastBidder: {
      firstname: 'Alice',
      lastname: 'Johnson',
      profilePicture: 'avatar-red-woman.svg',
      email: 'alice.johnson@example.com',
    },
    autoBidder: {} as Bidder,
  },
  {
    id: 4,
    creator: 'alice.johnson@example.com',
    category: AuctionCategory.Vehicles,
    description: "It's a beautiful motorcycle 1",
    currentPrice: 35,
    time: 150,
    title: 'Motorcycle 1',
    photos: [
      {
        id: 5,
        src: {
          original:
            'https://images.pexels.com/photos/3687770/pexels-photo-3687770.jpeg',
        },
        alt: 'Motorcycle 1 Image',
      },
    ],
    state: StateEnum.New,
    initialPrice: 35,
    finalPrice: 200,
    localisation: 'Location 4',
    lastBidder: {
      firstname: 'Bob',
      lastname: 'Wilson',
      profilePicture: 'avatar-glass-man.svg',
      email: 'bob.wilson@example.com',
    },
    autoBidder: {} as Bidder,
  },
  {
    id: 5,
    creator: 'john.doe@example.com',
    category: AuctionCategory.Art,
    description: "It's a beautiful sculpture 1",
    currentPrice: 40,
    time: 180,
    title: 'Sculpture 1',
    photos: [
      {
        id: 6,
        src: {
          original:
            'https://images.pexels.com/photos/3687770/pexels-photo-3687770.jpeg',
        },
        alt: 'Sculpture 1 Image',
      },
    ],
    state: StateEnum.VeryGood,
    initialPrice: 40,
    finalPrice: 100,
    localisation: 'Location 5',
    lastBidder: {
      firstname: 'Emily',
      lastname: 'Brown',
      profilePicture: 'avatar-glass-woman.svg',
      email: 'emily.brown@example.com',
    },
    autoBidder: {} as Bidder,
  },
  {
    id: 6,
    creator: 'emily.brown@example.com',
    category: AuctionCategory.Books,
    description: "It's a beautiful book 2",
    currentPrice: 25,
    time: 90,
    title: 'Book 2',
    photos: [
      {
        id: 7,
        src: {
          original:
            'https://images.pexels.com/photos/3687770/pexels-photo-3687770.jpeg',
        },
        alt: 'Book 2 Image',
      },
    ],
    state: StateEnum.Poor,
    initialPrice: 25,
    finalPrice: 0,
    localisation: 'Location 6',
    lastBidder: {
      firstname: 'John',
      lastname: 'Doe',
      profilePicture: 'avatar-suit-man.svg',
      email: 'john.doe@example.com',
    },
    autoBidder: {} as Bidder,
  },
  {
    id: 7,
    creator: 'alice.johnson@example.com',
    category: AuctionCategory.Vehicles,
    description: "It's a beautiful car 2",
    currentPrice: 28,
    time: 110,
    title: 'Car 2',
    photos: [
      {
        id: 8,
        src: {
          original:
            'https://images.pexels.com/photos/3687770/pexels-photo-3687770.jpeg',
        },
        alt: 'Car 2 Image',
      },
    ],
    state: StateEnum.New,
    initialPrice: 28,
    finalPrice: 50,
    localisation: 'Location 7',
    lastBidder: {
      firstname: 'Jane',
      lastname: 'Smith',
      profilePicture: 'avatar-red-woman.svg',
      email: 'jane.smith@example.com',
    },
    autoBidder: {} as Bidder,
  },
  {
    id: 8,
    creator: 'jane.smith@example.com',
    category: AuctionCategory.Art,
    description: "It's a beautiful painting 2",
    currentPrice: 45,
    time: 250,
    title: 'Painting 2',
    photos: [
      {
        id: 9,
        src: {
          original:
            'https://images.pexels.com/photos/3687770/pexels-photo-3687770.jpeg',
        },
        alt: 'Painting 2 Image',
      },
    ],
    state: StateEnum.VeryGood,
    initialPrice: 45,
    finalPrice: 56,
    localisation: 'Location 8',
    lastBidder: {
      firstname: 'Alice',
      lastname: 'Johnson',
      profilePicture: 'avatar-red-woman.svg',
      email: 'alice.johnson@example.com',
    },
    autoBidder: {} as Bidder,
  },
  {
    id: 9,
    creator: 'emily.brown@example.com',
    category: AuctionCategory.Art,
    description: "It's a beautiful book 3",
    currentPrice: 30,
    time: 140,
    title: 'Book 3',
    photos: [
      {
        id: 10,
        src: {
          original:
            'https://images.pexels.com/photos/3687770/pexels-photo-3687770.jpeg',
        },
        alt: 'Book 3 Image',
      },
    ],
    state: StateEnum.Poor,
    initialPrice: 30,
    finalPrice: 0,
    localisation: 'Location 9',
    lastBidder: {
      firstname: 'Bob',
      lastname: 'Wilson',
      profilePicture: 'avatar-glass-man.svg',
      email: 'bob.wilson@example.com',
    },
    autoBidder: {} as Bidder,
  },
  {
    id: 10,
    creator: 'bob.wilson@example.com',
    category: AuctionCategory.Art,
    description: "It's a beautiful painting 3",
    currentPrice: 35,
    time: 180,
    title: 'Painting 3',
    photos: [
      {
        id: 11,
        src: {
          original:
            'https://images.pexels.com/photos/3687770/pexels-photo-3687770.jpeg',
        },
        alt: 'Painting 3 Image',
      },
    ],
    state: StateEnum.New,
    initialPrice: 35,
    finalPrice: 0,
    localisation: 'Location 10',
    lastBidder: {
      firstname: 'Emily',
      lastname: 'Brown',
      profilePicture: 'avatar-glass-woman.svg',
      email: 'emily.brown@example.com',
    },
    autoBidder: {} as Bidder,
  },
];
