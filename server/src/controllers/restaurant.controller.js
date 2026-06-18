import { query } from '../config/db.js';

export const listRestaurants = async (req, res, next) => {
  try {
    const { cuisine, q, sort = 'rating' } = req.query;
    const where = [];
    const params = [];
    if (cuisine) { where.push('cuisine = ?'); params.push(cuisine); }
    if (q) { where.push('name LIKE ?'); params.push(`%${q}%`); }
    const orderBy = sort === 'time' ? 'delivery_time ASC' : 'rating DESC';
    const rows = await query(`SELECT * FROM restaurants ${where.length ? `WHERE ${where.join(' AND ')}` : ''} ORDER BY ${orderBy}`, params);
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
    const { name, image, rating = 4, cuisine, delivery_time = 30, offer = '' } = req.body;
    const result = await query('INSERT INTO restaurants (name, image, rating, cuisine, delivery_time, offer) VALUES (?, ?, ?, ?, ?, ?)', [name, image, rating, cuisine, delivery_time, offer]);
    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (error) {
    next(error);
  }
};

export const updateRestaurant = async (req, res, next) => {
  try {
    const { name, image, rating, cuisine, delivery_time, offer } = req.body;
    await query('UPDATE restaurants SET name = COALESCE(?, name), image = COALESCE(?, image), rating = COALESCE(?, rating), cuisine = COALESCE(?, cuisine), delivery_time = COALESCE(?, delivery_time), offer = COALESCE(?, offer) WHERE id = ?', [name, image, rating, cuisine, delivery_time, offer, req.params.id]);
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
