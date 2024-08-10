#H1 Footy Bet Sportsbook Application Documentation

#H2 Table of Contents:

    1.	Project Overview
    2.	Architecture
    3.	Main Components
    4.	Key Features
    5.	Technologies Used
    6.	Database Schema
    7.	Authentication and Authorization
    8.	API Integration
    9.	Future Improvements

    
#H2 Project Overview
Footy Bet is a sportsbook application focused on European football leagues. It allows users to view odds, place bets, manage their wallet, and track their betting history. The application provides a user-friendly interface for both regular users and administrators.

#H2 Architecture
The application follows a client-server architecture:
•	Frontend: React-based single-page application (SPA)
•	Backend: PocketBase (providing both database and API services)
•	API: The-odds-api for fetching real-time odds data

#H3 Frontend Architecture
•	Utilizes React components for modular UI construction
•	Uses React Router for navigation
•	Implements Context API for state management (AuthContext)
•	Employs custom hooks for form handling and persisted state

#H3 Backend Architecture
•	PocketBase serves as both the database and API server
•	Handles user authentication, data storage, and basic CRUD operations

#H2 Main Components
1.	App: The root component that sets up routing and global context
2.	Navbar: Navigation component displayed across all pages
3.	Home: Landing page showing top games from each league
4.	Login/Signup: User authentication components
5.	UserProfile: User profile management and betting history display
6.	Wallet: Manages user's balance, deposits, and withdrawals
7.	OddsOfGame: Displays odds for a specific game and allows bet placement
8.	Betslip: Shows current bets and allows users to confirm their wagers
9.	ResolveBets: Admin component for resolving bet outcomes
    
#H2 Key Features
1.	User authentication and authorization
2.	Real-time odds display for multiple European football leagues
3.	Bet placement on various outcomes (1X2, Over/Under)
4.	Wallet management (deposits and withdrawals)
5.	User profile management
6.	Betting history tracking
7.	Admin interface for resolving bets

#H2 Technologies Used
•	React
•	React Router
•	Tailwind CSS
•	PocketBase
•	The-odds-api

#H2 Database Schema
Key collections in PocketBase:
1.	users: Stores user information
2.	transactions: Records all financial transactions (deposits, withdrawals, bets)
3.	bets: Stores all placed bets and their outcomes

#H2 Authentication and Authorization
•	Utilizes PocketBase's built-in authentication system
•	Implements role-based access control (regular users vs admins)
•	Uses AuthContext to manage authentication state across the application

#H2 API Integration
•	Integrates with the-odds-api to fetch real-time odds data
•	Uses PocketBase's API for all database operations and user management

#H2 Future Improvements
1.	Implement real-time updates for odds and bet status
2.	Add support for more sports and betting types
3.	Enhance the admin dashboard with more detailed analytics
4.	Implement a notification system for bet outcomes and promotions
5.	Add social features like sharing bets or following other users
