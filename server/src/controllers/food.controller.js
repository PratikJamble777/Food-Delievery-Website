import { query } from '../config/db.js';

export const listFoods = async (req, res, next) => {
  try {
    const { category, q, restaurant_id } = req.query;
    const where = [];
    const params = [];
    if (category) { where.push('category = ?'); params.push(category); }
    if (restaurant_id) { where.push('restaurant_id = ?'); params.push(restaurant_id); }
    if (q) { where.push('(name LIKE ? OR description LIKE ?)'); params.push(`%${q}%`, `%${q}%`); }
    const rows = await query(`SELECT * FROM foods ${where.length ? `WHERE ${where.join(' AND ')}` : ''} ORDER BY rating DESC, name ASC`, params);
    res.json(rows);
  } catch (error) {
    next(error);
  }
};

export const getFood = async (req, res, next) => {
  try {
    const rows = await query('SELECT * FROM foods WHERE id = ?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ message: 'Food not found' });
    res.json(rows[0]);
  } catch (error) {
    next(error);
  }
};

export const createFood = async (req, res, next) => {
  try {
    const { restaurant_id, name, description, image, price, category, rating = 4.5, ingredients = '' } = req.body;
    const result = await query('INSERT INTO foods (restaurant_id, name, description, image, price, category, rating, ingredients) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [restaurant_id, name, description, image, price, category, rating, ingredients]);
    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (error) {
    next(error);
  }
};

export const updateFood = async (req, res, next) => {
  try {
    const { restaurant_id, name, description, image, price, category, rating, ingredients } = req.body;
    await query('UPDATE foods SET restaurant_id = COALESCE(?, restaurant_id), name = COALESCE(?, name), description = COALESCE(?, description), image = COALESCE(?, image), price = COALESCE(?, price), category = COALESCE(?, category), rating = COALESCE(?, rating), ingredients = COALESCE(?, ingredients) WHERE id = ?', [restaurant_id, name, description, image, price, category, rating, ingredients, req.params.id]);
    const rows = await query('SELECT * FROM foods WHERE id = ?', [req.params.id]);
    res.json(rows[0]);
  } catch (error) {
    next(error);
  }
};

export const deleteFood = async (req, res, next) => {
  try {
    await query('DELETE FROM foods WHERE id = ?', [req.params.id]);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
