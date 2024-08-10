Footy Bet Sportsbook Application Documentation
Table of Contents

Project Overview
Architecture
Main Components
Key Features
Technologies Used
Database Schema
Authentication and Authorization
API Integration
Future Improvements

Project Overview
Footy Bet is a sportsbook application focused on European football leagues. It allows users to view odds, place bets, manage their wallet, and track their betting history. The application provides a user-friendly interface for both regular users and administrators.
Architecture
The application follows a client-server architecture:

Frontend: React-based single-page application (SPA)
Backend: PocketBase (providing both database and API services)
API: The-odds-api for fetching real-time odds data

Frontend Architecture

Utilizes React components for modular UI construction
Uses React Router for navigation
Implements Context API for state management (AuthContext)
Employs custom hooks for form handling and persisted state

Backend Architecture

PocketBase serves as both the database and API server
Handles user authentication, data storage, and basic CRUD operations

Main Components

App: The root component that sets up routing and global context
Navbar: Navigation component displayed across all pages
Home: Landing page showing top games from each league
Login/Signup: User authentication components
UserProfile: User profile management and betting history display
Wallet: Manages user's balance, deposits, and withdrawals
OddsOfGame: Displays odds for a specific game and allows bet placement
Betslip: Shows current bets and allows users to confirm their wagers
ResolveBets: Admin component for resolving bet outcomes

Key Features

User authentication and authorization
Real-time odds display for multiple European football leagues
Bet placement on various outcomes (1X2, Over/Under)
Wallet management (deposits and withdrawals)
User profile management
Betting history tracking
Admin interface for resolving bets

Technologies Used

React
React Router
Tailwind CSS
PocketBase
The-odds-api

Database Schema
Key collections in PocketBase:

users: Stores user information
transactions: Records all financial transactions (deposits, withdrawals, bets)
bets: Stores all placed bets and their outcomes

Authentication and Authorization

Utilizes PocketBase's built-in authentication system
Implements role-based access control (regular users vs admins)
Uses AuthContext to manage authentication state across the application

API Integration

Integrates with the-odds-api to fetch real-time odds data
Uses PocketBase's API for all database operations and user management

Future Improvements

Implement real-time updates for odds and bet status
Add support for more sports and betting types
Enhance the admin dashboard with more detailed analytics
Implement a notification system for bet outcomes and promotions
Add social features like sharing bets or following other users
