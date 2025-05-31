## Project Name : Hostel Management Client

## Admin Credentials :

- **Username :** cr7@gmail.com
- **Password :** 1412Mu@

## Live Site URL :

-- https://b10a12-final-project-ffb43.web.app

## Purpose :

- The Hostel Management System is a MERN stack-based web application designed to streamline hostel meal management for students. It enables administrators to manage students, meals, and reviews efficiently while providing students with an intuitive platform to log in, view, and request meals.

## Features :

1. **Student Login and Profile Management**:
   - Students can log in to access their profiles.
2. **Meal Management**:
   - Admins can add, update, and delete meal details such as title, image, category, ingredients, and price.
   - Meals are categorized as Breakfast, Lunch, and Dinner.
3. **Food Reviews**:
   - Students can post reviews for meals with ratings and comments.
   - Admins have the authority to delete reviews.
4. **Dynamic Meal Details**:
   - View complete details of meals, including the distributor's name, ingredients, description, rating, and post time.
5. **Meal Request System**:
   - Students can request specific meals (requires a package subscription).
   - Admins can manage and serve requested meals, updating their status.
6. **Responsive Design**:
   - Fully responsive layout for seamless usage on mobile, tablet, and desktop devices.
7. **Upcoming Meals Management**:
   - Premium users can view and like upcoming meals before they are published.
   - Admins can schedule and publish upcoming meals.
8. **Stripe Payment Integration**:
   - Users can purchase premium packages (Silver, Gold, Platinum) securely via Stripe.
   - Badges are assigned to users based on their subscription level.
9. **Admin Dashboard**:
   - Features include managing users, meals, food reviews, and upcoming meals.
   - Server-side search and sort functionalities enhance administrative efficiency.
10. **Persistent Login and JWT Authentication**:
    - Users remain logged in even after refreshing the page.
    - Secure authentication via JWT tokens and Axios interceptor for API requests.

## Additional Pages :

- **Join Us Page:** User registration and social login options are implemented.
- **User Dashboard:** Displays user profile, requested meals, reviews, and payment history.
- **Admin Dashboard:** Offers comprehensive tools for managing the system effectively.

## Technology Stack :

- **Front-End:** React.js, Tailwind CSS, React Router, React Hook Form
- **Back-End:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** Firebase
- **Payment Gateway:** Stripe

## Installation and Setup

### Clone the repository

- git clone

### Install dependencies

- npm install

### Start the server

- npm run dev / npx vite

## dependencies

- "@headlessui/react": "^2.2.0",
- "@stripe/react-stripe-js": "^3.1.1",
- "@stripe/stripe-js": "^5.5.0",
- "@tanstack/react-query": "^5.64.1",
- "axios": "^1.7.9",
- "firebase": "^11.1.0",
- "moment": "^2.30.1",
- "moment-timezone": "^0.5.46",
- "react": "^18.3.1",
- "react-dom": "^18.3.1",
- "react-helmet-async": "^2.0.5",
- "react-hook-form": "^7.54.2",
- "react-hot-toast": "^2.5.1",
- "react-icons": "^5.4.0",
- "react-infinite-scroll-component": "^6.1.0",
- "react-query": "^3.39.3",
- "react-rating-stars-component": "^2.2.0",
- "react-router-dom": "^7.1.1",
- "react-spinners": "^0.15.0",
- "sweetalert2": "^11.15.10"

## devDependencies

- "@eslint/js": "^9.17.0",
- "@types/react": "^18.3.18",
- "@types/react-dom": "^18.3.5",
- "@vitejs/plugin-react": "^4.3.4",
- "autoprefixer": "^10.4.20",
- "daisyui": "^4.12.23",
- "eslint": "^9.17.0",
- "eslint-plugin-react": "^7.37.2",
- "eslint-plugin-react-hooks": "^5.0.0",
- "eslint-plugin-react-refresh": "^0.4.16",
- "globals": "^15.14.0",
- "postcss": "^8.4.49",
- "tailwindcss": "^3.4.17",
- "vite": "^6.0.5"
