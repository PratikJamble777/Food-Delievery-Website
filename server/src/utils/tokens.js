import jwt from 'jsonwebtoken';

export const signToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET || 'development-secret',
    { expiresIn: '7d' }
  );
};
