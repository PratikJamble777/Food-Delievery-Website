USE pratik_food_delivery;

INSERT INTO users (name, email, mobile, password, role) VALUES
('Admin User', 'admin@pratikfood.com', '9999999999', '$2a$12$3KxXMxe3wCHcQ4IwqQ3duu05Q9B.Mw/FC5nknqTSOgU4I5LsDH6dq', 'admin'),
('Pratik Customer', 'customer@pratikfood.com', '9876543210', '$2a$12$3KxXMxe3wCHcQ4IwqQ3duu05Q9B.Mw/FC5nknqTSOgU4I5LsDH6dq', 'user')
ON DUPLICATE KEY UPDATE email = VALUES(email);

INSERT INTO restaurants (id, name, image, rating, cuisine, delivery_time, latitude, longitude, offer) VALUES
(1, 'Spice Junction', 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=900&q=80', 4.8, 'Biryani', 24, 19.07609000, 72.87742600, '40% OFF'),
(2, 'Urban Burger Co.', 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&q=80', 4.6, 'Burger', 19, 19.11967700, 72.84683200, 'Free Fries'),
(3, 'La Roma Pizza', 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80', 4.7, 'Pizza', 28, 18.52043000, 73.85674300, 'Buy 1 Get 1'),
(4, 'South Bowl', 'https://images.unsplash.com/photo-1630383249896-424e482df921?auto=format&fit=crop&w=900&q=80', 4.5, 'South Indian', 22, 19.21833000, 72.97808800, '20% OFF')
ON DUPLICATE KEY UPDATE name = VALUES(name), rating = VALUES(rating), latitude = VALUES(latitude), longitude = VALUES(longitude);

INSERT INTO foods (id, restaurant_id, name, description, image, price, category, rating, ingredients) VALUES
(1, 1, 'Hyderabadi Dum Biryani', 'Aromatic basmati rice layered with tender spiced chicken and saffron.', 'https://images.unsplash.com/photo-1563379091339-03246963d51a?auto=format&fit=crop&w=900&q=80', 279, 'Biryani', 4.9, 'Basmati rice, Chicken, Saffron, Mint, House masala'),
(2, 2, 'Loaded Classic Burger', 'Juicy grilled patty, cheese, caramelized onions, lettuce, and secret sauce.', 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80', 199, 'Burger', 4.7, 'Brioche bun, Patty, Cheddar, Lettuce, Signature sauce'),
(3, 3, 'Margherita Woodfire Pizza', 'San Marzano tomato, mozzarella, basil, and extra virgin olive oil.', 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=900&q=80', 329, 'Pizza', 4.8, 'Mozzarella, Tomato, Basil, Olive oil, Sourdough base'),
(4, 4, 'Crispy Masala Dosa', 'Golden dosa filled with potato masala, served with sambar and chutneys.', 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=900&q=80', 149, 'South Indian', 4.6, 'Rice batter, Potato, Curry leaves, Coconut chutney, Sambar'),
(5, 1, 'Chilli Garlic Noodles', 'Wok-tossed noodles with fresh vegetables and a fiery garlic sauce.', 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=900&q=80', 179, 'Chinese', 4.4, 'Noodles, Garlic, Bell pepper, Scallion, Soy glaze'),
(6, 3, 'Chocolate Lava Cake', 'Warm chocolate cake with a molten center and vanilla cream.', 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=80', 129, 'Desserts', 4.9, 'Dark chocolate, Butter, Cocoa, Vanilla cream'),
(7, 2, 'Mango Mint Cooler', 'Chilled mango, mint, lime, and sparkling water.', 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=900&q=80', 99, 'Beverages', 4.5, 'Mango, Mint, Lime, Sparkling water')
ON DUPLICATE KEY UPDATE name = VALUES(name), price = VALUES(price);

INSERT INTO addresses (user_id, label, address, city, pincode) VALUES
(2, 'Home', '221 Food Street', 'Mumbai', '400001')
ON DUPLICATE KEY UPDATE address = VALUES(address);

INSERT INTO coupons (code, description, discount_amount, min_order_value, active) VALUES
('PRATIK120', 'Flat Rs.120 off above Rs.799', 120, 799, TRUE),
('FRESH50', 'Flat Rs.50 off above Rs.399', 50, 399, TRUE)
ON DUPLICATE KEY UPDATE description = VALUES(description);
