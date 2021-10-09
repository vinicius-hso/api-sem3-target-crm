import { NextFunction, Request, Response } from 'express';
import User from '@entities/User';

export async function ensureOwner(req: Request, res: Response, next: NextFunction): Promise<Response | NextFunction> {
  try {
    const userId = req.userId;
    const id = req.params.id;

    const user = await User.findOneOrFail(userId);

    if (user.id !== id ) {
      return res.status(403).json({ message: 'You are not authorized' })
    } else {
      if (next) await next();
    }
    
    if (next) await next();
  } catch (error) {
    return res.status(404).json({ message: 'Bad request' })
  }
}
