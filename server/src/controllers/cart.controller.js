import { query } from '../config/db.js';

export const getCart = async (req, res, next) => {
  try {
    const rows = await query(
      'SELECT c.id, c.food_id, c.quantity, f.name, f.price, f.image FROM cart_items c JOIN foods f ON f.id = c.food_id WHERE c.user_id = ? ORDER BY c.created_at DESC',
      [req.user.id]
    );
    res.json(rows);
  } catch (error) {
    next(error);
  }
};

export const addItem = async (req, res, next) => {
  try {
    const { food_id, quantity = 1 } = req.body;
    await query(
      'INSERT INTO cart_items (user_id, food_id, quantity) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE quantity = quantity + VALUES(quantity)',
      [req.user.id, food_id, quantity]
    );
    res.status(201).json({ message: 'Item added to cart' });
  } catch (error) {
    next(error);
  }
};

export const updateItem = async (req, res, next) => {
  try {
    const { quantity } = req.body;
    if (quantity <= 0) {
      await query('DELETE FROM cart_items WHERE user_id = ? AND food_id = ?', [req.user.id, req.params.foodId]);
      return res.status(204).end();
    }
    await query('UPDATE cart_items SET quantity = ? WHERE user_id = ? AND food_id = ?', [quantity, req.user.id, req.params.foodId]);
    res.json({ message: 'Cart updated' });
  } catch (error) {
    next(error);
  }
};

export const removeItem = async (req, res, next) => {
  try {
    await query('DELETE FROM cart_items WHERE user_id = ? AND food_id = ?', [req.user.id, req.params.foodId]);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

export const clearCart = async (req, res, next) => {
  try {
    await query('DELETE FROM cart_items WHERE user_id = ?', [req.user.id]);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
