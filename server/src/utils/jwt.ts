import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'hasin_portfolio_jwt_secret_key_2026';

export const generateToken = (payload: object): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
};

export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};
