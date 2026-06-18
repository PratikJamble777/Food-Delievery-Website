# Pratik Food Delivery

Premium full-stack food delivery web app built with React, Express, Node.js, and MySQL.

## Features

- Responsive food delivery storefront with restaurants, menu, product details, cart, checkout, order success, dashboard, admin, contact, and FAQ pages.
- JWT authentication with bcrypt password hashing on the API.
- MySQL schema and seed data for users, restaurants, foods, orders, order items, addresses, carts, wishlist, coupons, and newsletter subscriptions.
- Admin-ready REST APIs for users, restaurants, foods, orders, and cart management.
- Location-aware restaurant discovery with `lat`, `lng`, and `radius` query parameters.
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
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=pratik_food_delivery
DB_SSL=false
```

## Database Setup

```bash
mysql -u root -p < database/schema.sql
mysql -u root -p pratik_food_delivery < database/seed.sql
```

For an existing database created before location support was added, run:

```bash
mysql -u root -p pratik_food_delivery < database/migration_add_restaurant_location.sql
```

## Run Development

```bash
npm run dev
```

Frontend: `http://localhost:5173`

Backend: `http://localhost:5000/api/health`

Nearby restaurants API example:

```text
GET http://localhost:5000/api/restaurants?lat=19.07609&lng=72.877426&radius=25
```

## Production Build

```bash
npm run build
npm start
```

The Express server serves the built frontend from `client/dist` when available.

## Free Deployment

Recommended free setup:

- Frontend: Netlify
- Backend: Render web service
- Database: Aiven MySQL free plan

### Netlify

Use the included `netlify.toml`.

```text
Build command: npm run build
Publish directory: client/dist
```

Add this Netlify environment variable after the backend is deployed:

```text
VITE_API_URL=https://your-render-service.onrender.com/api
```

### Render

Use the included `render.yaml` or create a Web Service manually:

```text
Root directory: server
Build command: npm install
Start command: npm start
```

Set these Render environment variables:

```text
CLIENT_URL=https://your-netlify-site.netlify.app
DB_HOST=your-aiven-host
DB_PORT=your-aiven-port
DB_USER=your-aiven-user
DB_PASSWORD=your-aiven-password
DB_NAME=your-aiven-database
DB_SSL=true
JWT_SECRET=use-a-long-random-secret
```
