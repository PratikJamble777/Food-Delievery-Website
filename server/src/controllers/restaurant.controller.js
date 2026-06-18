import { query } from '../config/db.js';

export const listRestaurants = async (req, res, next) => {
  try {
    const { cuisine, q, sort = 'rating', lat, lng, radius = 15 } = req.query;
    const where = [];
    const params = [];
    const latitude = Number(lat);
    const longitude = Number(lng);
    const radiusKm = Number(radius);
    const hasLocation = Number.isFinite(latitude) && Number.isFinite(longitude);

    if (cuisine) { where.push('cuisine = ?'); params.push(cuisine); }
    if (q) { where.push('name LIKE ?'); params.push(`%${q}%`); }

    const distanceSql = hasLocation
      ? `, ROUND((6371 * ACOS(LEAST(1, GREATEST(-1,
          COS(RADIANS(?)) * COS(RADIANS(latitude)) *
          COS(RADIANS(longitude) - RADIANS(?)) +
          SIN(RADIANS(?)) * SIN(RADIANS(latitude))
        )))), 2) AS distance_km`
      : '';

    const selectParams = hasLocation ? [latitude, longitude, latitude] : [];
    if (hasLocation) where.push('latitude IS NOT NULL AND longitude IS NOT NULL');

    const orderBy = hasLocation
      ? 'distance_km ASC, rating DESC'
      : sort === 'time' ? 'delivery_time ASC' : 'rating DESC';

    const havingSql = hasLocation && Number.isFinite(radiusKm) ? ' HAVING distance_km <= ?' : '';
    const havingParams = hasLocation && Number.isFinite(radiusKm) ? [radiusKm] : [];

    const rows = await query(
      `SELECT * ${distanceSql} FROM restaurants ${where.length ? `WHERE ${where.join(' AND ')}` : ''}${havingSql} ORDER BY ${orderBy}`,
      [...selectParams, ...params, ...havingParams]
    );
    res.json(rows);
  } catch (error) {
    next(error);
  }
};

export const getRestaurant = async (req, res, next) => {
  try {
    const rows = await query('SELECT * FROM restaurants WHERE id = ?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ message: 'Restaurant not found' });
    res.json(rows[0]);
  } catch (error) {
    next(error);
  }
};

export const createRestaurant = async (req, res, next) => {
  try {
    const { name, image, rating = 4, cuisine, delivery_time = 30, latitude = null, longitude = null, offer = '' } = req.body;
    const result = await query('INSERT INTO restaurants (name, image, rating, cuisine, delivery_time, latitude, longitude, offer) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [name, image, rating, cuisine, delivery_time, latitude, longitude, offer]);
    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (error) {
    next(error);
  }
};

export const updateRestaurant = async (req, res, next) => {
  try {
    const { name, image, rating, cuisine, delivery_time, latitude, longitude, offer } = req.body;
    await query('UPDATE restaurants SET name = COALESCE(?, name), image = COALESCE(?, image), rating = COALESCE(?, rating), cuisine = COALESCE(?, cuisine), delivery_time = COALESCE(?, delivery_time), latitude = COALESCE(?, latitude), longitude = COALESCE(?, longitude), offer = COALESCE(?, offer) WHERE id = ?', [name, image, rating, cuisine, delivery_time, latitude, longitude, offer, req.params.id]);
    const rows = await query('SELECT * FROM restaurants WHERE id = ?', [req.params.id]);
    res.json(rows[0]);
  } catch (error) {
    next(error);
  }
};

export const deleteRestaurant = async (req, res, next) => {
  try {
    await query('DELETE FROM restaurants WHERE id = ?', [req.params.id]);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
