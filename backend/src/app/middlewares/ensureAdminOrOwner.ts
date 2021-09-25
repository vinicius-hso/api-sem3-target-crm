import { NextFunction, Request, Response } from 'express';
import User from '@entities/User';

export async function ensureAdminOrOwner(req: Request, res: Response, next: NextFunction): Promise<Response | NextFunction> {
  const userId = req.userId;
  const id = req.params.id;

  const user = await User.findOne(userId);

  if (user.role !== 'ADMIN') {
    if (user.id !== id ) {
      return res.status(403).json({ message: 'You are not authorized' })
    } else {
      if (next) await next();
    }
  }

  if (next) await next();
}
