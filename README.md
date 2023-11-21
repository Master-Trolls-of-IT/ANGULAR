# Angular Project

The developed application is an auction application with several features:

## Features
- User account creation
- Login
- Auction item creation
- Bidding functionality
- Auto-bidding functionality
- Direct purchase option if a buyout price is defined (optional)

## Additional Features
- Responsive design
- Using mocked data
- Using stores for state management
- Translated into French and English
- Redirects non-existing routes
- Using a generic Subject LocalStorage to save Auction Items and Authenticated User
- Using a Linter
- Using Validators on every Form
- Using Guards on routes
- The owner of an auction has a custom display when clicking on it
- When an auction item timer reaches 0, the item is automatically removed from the Auctions and properly added to last bidder purchase history if exists
- Using External API (Pexels) for images when creating an Auction
- Changing the language in the user profile page
- Pre-filling the inputs with previously connected user
- Filtered auction items with user profile preferences. Searchbar (Title + Description).
- The auction items are also filtered by ownership : the creator of the auction can only see it in the auction tab in the profile page

## More Precision
- Using all the advanced typescript functionalities (seen) except for Type Guards (no usage)

## Important Notes
- If the application is run locally, changing the URL will reset auction items timers, so be cautious.
- To return to the login page, use the "Logout" button on the profile page.
- To reset the data , clear the localStorage.
- Using an API key : (src/environments)

- The app is using a local proxy. Run either npm start <=> ng serve --proxy-config proxy.conf.json.
- The proxy isn't supported on gitlab Pages, so the API Pexels pictures can't be retrieved using gitlab Pages. To retrive the photos, run the app in local
  with `ng serve --proxy-config proxy.conf.json` (or  `npm start`).

## User Preferences
The list of auctions is sorted based on user preferences, which can be modified on the profile page.

## Environment Setup

1. Run `npm install` to install the dependencies.
2. Run `npm start` to start the application.
3. You can use these credentials :
   - email: john.doe@example.com
   - password: john

The application will be accessible at: `http://localhost:4200`.
