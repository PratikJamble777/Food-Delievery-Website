USE pratik_food_delivery;

ALTER TABLE restaurants
  ADD COLUMN latitude DECIMAL(10,8) NULL AFTER delivery_time,
  ADD COLUMN longitude DECIMAL(11,8) NULL AFTER latitude,
  ADD INDEX idx_restaurants_location (latitude, longitude);

UPDATE restaurants SET latitude = 19.07609000, longitude = 72.87742600 WHERE id = 1;
UPDATE restaurants SET latitude = 19.11967700, longitude = 72.84683200 WHERE id = 2;
UPDATE restaurants SET latitude = 18.52043000, longitude = 73.85674300 WHERE id = 3;
UPDATE restaurants SET latitude = 19.21833000, longitude = 72.97808800 WHERE id = 4;
