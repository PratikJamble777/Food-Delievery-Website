import { pool, query } from '../config/db.js';

export const listOrders = async (req, res, next) => {
  try {
    const sql = req.user.role === 'admin'
      ? 'SELECT * FROM orders ORDER BY created_at DESC'
      : 'SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC';
    const rows = await query(sql, req.user.role === 'admin' ? [] : [req.user.id]);
    res.json(rows);
  } catch (error) {
    next(error);
  }
};

export const getOrder = async (req, res, next) => {
  try {
    const orders = await query('SELECT * FROM orders WHERE id = ? AND (? = "admin" OR user_id = ?)', [req.params.id, req.user.role, req.user.id]);
    if (!orders.length) return res.status(404).json({ message: 'Order not found' });
    const items = await query('SELECT oi.*, f.name, f.image, f.price FROM order_items oi JOIN foods f ON f.id = oi.food_id WHERE oi.order_id = ?', [req.params.id]);
    res.json({ ...orders[0], items });
  } catch (error) {
    next(error);
  }
};

export const createOrder = async (req, res, next) => {
  const connection = await pool.getConnection();
  try {
    const { items, address_id, payment_method = 'Cash on Delivery', total_price } = req.body;
    if (!Array.isArray(items) || !items.length) return res.status(400).json({ message: 'Order items are required' });
    await connection.beginTransaction();
    const [orderResult] = await connection.execute(
      'INSERT INTO orders (user_id, address_id, total_price, status, payment_method) VALUES (?, ?, ?, ?, ?)',
      [req.user.id, address_id || null, total_price, 'Placed', payment_method]
    );
    for (const item of items) {
      await connection.execute('INSERT INTO order_items (order_id, food_id, quantity) VALUES (?, ?, ?)', [orderResult.insertId, item.food_id, item.quantity]);
    }
    await connection.commit();
    res.status(201).json({ id: orderResult.insertId, status: 'Placed' });
  } catch (error) {
    await connection.rollback();
    next(error);
  } finally {
    connection.release();
  }
};

export const updateOrder = async (req, res, next) => {
  try {
    const { status } = req.body;
    await query('UPDATE orders SET status = COALESCE(?, status) WHERE id = ?', [status, req.params.id]);
    const rows = await query('SELECT * FROM orders WHERE id = ?', [req.params.id]);
    res.json(rows[0]);
  } catch (error) {
    next(error);
  }
};

export const deleteOrder = async (req, res, next) => {
  try {
    await query('DELETE FROM orders WHERE id = ?', [req.params.id]);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
