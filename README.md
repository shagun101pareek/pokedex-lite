# Pokedex Lite

A modern web app, built to explore Pokémon in a user friendly way. The app fetches data from the PokéAPI (existing) and displays Pokémon in a structured format with
-search, 
-filtering,
-pagination,
-favorites, 
-detailed views.

The main goal of this project is to efficiently fetch Pokémon data, present it clearly, and provide smooth interactions through animations and responsive design.

## How the Application Works -

### Data Fetching
Used the PokéAPI to fetch Pokémon data in multiple stages. The Pokémon list is fetched using pagination, and additional details such as species data, evolution chain, stats, height, and weight are fetched when a Pokémon card is clicked. Loading states are handled using a spinner while data is being retrieved.

### Listing & Basic UI
Displayed Pokémon in a responsive grid layout showing the Pokémon image, name, ID, and type badges. Each card is styled dynamically based on the Pokémon’s primary type. The layout is responsive and works across different screen sizes.

### Search
Implemented a search input that allows users to search Pokémon by name. A global search approach is used so users can find Pokémon even if they are not currently visible on the page.

### Filtering by Type
Added filtering functionality that allows users to filter Pokémon based on their types. Users can select one or more types, and only matching Pokémon are displayed.

### Pagination
Implemented pagination using limit and offset values from the API. Users can navigate between pages using next and previous buttons. This improves performance by loading Pokémon in smaller batches.

### Favorites
Added the ability to mark Pokémon as favorites using a heart icon on each card. Favorites are stored in local storage so they remain saved even after refreshing the page. A favorites mode allows users to view only their selected Pokémon.

### Detail View
When a Pokémon card is clicked, a modal opens displaying detailed Pokémon information. This includes description text, evolution chain with images, base stats displayed as animated progress bars, abilities, height, and weight. The modal can be closed to return to the main list.

### Build & Deployment
The project can be run locally using standard npm commands to install dependencies and start the development server. The application has also been deployed online so it can be accessed directly.

---

## Bonus Features Implemented

### User Authentication (OAuth)
Implemented a basic Google OAuth login flow that allows users to log in and display their profile information. Logout functionality is also provided.

### Animations
Added hover animations on Pokémon cards, smooth modal opening effects, animated stat bars that fill from left to right, and subtle UI transitions to improve the user experience.

### Additional Enhancements
Displayed Pokémon evolution chains using images fetched from the evolution API. Implemented loading animations and smooth transitions to improve perceived performance and overall usability.

---

## Technologies Used

React
TypeScript
TailwindCSS
Vite
PokéAPI
Google OAuth

---

## API Used

This project uses the PokéAPI to retrieve Pokémon data.
https://pokeapi.co/
Different endpoints are used to fetch Pokémon lists, species details, evolution chains, and individual Pokémon data.

---

## Deployment
This app is deployed using Vercel for easy access and testing.

You can open the deployed link in any browser to explore the app without installing it locally.
https://pokedex-lite-orcin.vercel.app/

---

## Future Improvements

Possible enhancements that can be added in future versions:

• Add sorting options (by name, stats, or type)
• Improve caching for faster loading
• Add dark mode support
• Improve accessibility features
• Explore server-side rendering for performance improvements

---
