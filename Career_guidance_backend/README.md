# Career Guidance Community Portal - Backend

This repository contains the backend API for the Career Guidance Community Portal. It provides endpoints for accessing career categories, mentor profiles, and booking functionality.

## Features

- RESTful API endpoints for career categories
- API endpoints for mentor profiles and filtering
- Authentication endpoints (register, login)
- Booking management endpoints
- Mock data for quick testing

## Tech Stack

- Node.js
- Express.js
- MongoDB (optional)
- JSON Web Tokens for authentication

## API Endpoints

### Categories
- `GET /api/categories` - Get all career categories
- `GET /api/categories/:id` - Get category by ID
- `GET /api/categories/path/:pathName` - Get category by path

### Mentors
- `GET /api/mentors` - Get all mentors
- `GET /api/mentors/:id` - Get mentor by ID
- `GET /api/mentors/category/:category` - Get mentors by category

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Bookings
- `POST /api/bookings` - Create a new booking
- `GET /api/bookings` - Get all bookings (admin only)
- `GET /api/bookings/:id` - Get booking by ID
- `PUT /api/bookings/:id` - Update booking status
- `GET /api/bookings/me` - Get current user's bookings
- `GET /api/bookings/mentor/:mentorId` - Get bookings for a mentor

## Getting Started

1. Clone the repository
2. Install dependencies with `npm install`
3. Create a `.env` file with the following variables:
   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRE=30d
   ```
4. Run the development server with `npm run dev`

## Scripts

- `npm start` - Start the production server
- `npm run dev` - Start the development server with nodemon
- `npm run import-data` - Import sample data to the database
- `npm run delete-data` - Delete all data from the database

## Deployment

This application can be deployed to Heroku, Vercel, or any other Node.js hosting provider.

## License

MIT 