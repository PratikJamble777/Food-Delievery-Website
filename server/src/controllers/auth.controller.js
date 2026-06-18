import bcrypt from 'bcryptjs';
import { query } from '../config/db.js';
import { signToken } from '../utils/tokens.js';

const publicUser = (user) => ({ id: user.id, name: user.name, email: user.email, mobile: user.mobile, role: user.role });

export const register = async (req, res, next) => {
  try {
    const { name, email, mobile, password } = req.body;
    const existing = await query('SELECT id FROM users WHERE email = ?', [email]);
    if (existing.length) return res.status(409).json({ message: 'Email already registered' });

    const hash = await bcrypt.hash(password, 12);
    const result = await query('INSERT INTO users (name, email, mobile, password, role) VALUES (?, ?, ?, ?, ?)', [name, email, mobile, hash, 'user']);
    const user = { id: result.insertId, name, email, mobile, role: 'user' };
    res.status(201).json({ user: publicUser(user), token: signToken(user) });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const users = await query('SELECT * FROM users WHERE email = ?', [email]);
    const user = users[0];
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    res.json({ user: publicUser(user), token: signToken(user) });
  } catch (error) {
    next(error);
  }
};

export const profile = async (req, res) => {
  res.json({ user: req.user });
};
