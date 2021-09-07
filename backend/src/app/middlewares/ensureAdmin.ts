import { NextFunction, Request, Response } from 'express';
import User from '@entities/User';

export async function ensureAdmin(req: Request, res: Response, next: NextFunction): Promise<Response | NextFunction> {
  const userId = req.userId;

  const user = await User.findOne(userId);

  if (user.role !== 'ADMIN') return res.status(403).json({ message: 'You are not authorized'});

  if (next) return next;
}
