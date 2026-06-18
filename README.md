# Pratik Food Delivery

Premium full-stack food delivery web app built with React, Express, Node.js, and MySQL.

## Features

- Responsive food delivery storefront with restaurants, menu, product details, cart, checkout, order success, dashboard, admin, contact, and FAQ pages.
- JWT authentication with bcrypt password hashing on the API.
- MySQL schema and seed data for users, restaurants, foods, orders, order items, addresses, carts, wishlist, coupons, and newsletter subscriptions.
- Admin-ready REST APIs for users, restaurants, foods, orders, and cart management.
- Dark mode, mobile navigation, wishlist UI, coupons, search suggestions, skeleton loaders, hover states, cart drawer animation, success animation, and scroll animations.

## Project Structure

```text
client/      React + Vite frontend
server/      Express backend API
database/    MySQL schema and seed data
```

## Installation

```bash
npm run install:all
```

## Environment

Create `server/.env` from `server/.env.example`.

```bash
PORT=5000
CLIENT_URL=http://localhost:5173
JWT_SECRET=replace-with-a-long-random-secret
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=pratik_food_delivery
```

## Database Setup

```bash
mysql -u root -p < database/schema.sql
mysql -u root -p pratik_food_delivery < database/seed.sql
```

## Run Development

```bash
npm run dev
```

Frontend: `http://localhost:5173`

Backend: `http://localhost:5000/api/health`

## Production Build

```bash
npm run build
npm start
```

The Express server serves the built frontend from `client/dist` when available.
