import { query } from '../config/db.js';

export const listUsers = async (_req, res, next) => {
  try {
    const users = await query('SELECT id, name, email, mobile, role, created_at FROM users ORDER BY created_at DESC');
    res.json(users);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { name, mobile, role } = req.body;
    await query('UPDATE users SET name = COALESCE(?, name), mobile = COALESCE(?, mobile), role = COALESCE(?, role) WHERE id = ?', [name, mobile, role, req.params.id]);
    const users = await query('SELECT id, name, email, mobile, role FROM users WHERE id = ?', [req.params.id]);
    res.json(users[0]);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    await query('DELETE FROM users WHERE id = ?', [req.params.id]);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
