import rateLimit from 'express-rate-limit';

export const contactRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 contact submissions per windowMs
  message: {
    success: false,
    message: 'Too many contact messages submitted from this IP. Please try again after 15 minutes.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export const apiRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100, // limit each IP to 100 requests per 15 minutes
  standardHeaders: true,
  legacyHeaders: false,
});
