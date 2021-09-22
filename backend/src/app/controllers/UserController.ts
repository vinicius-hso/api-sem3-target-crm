import User from '@entities/User';
import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';

interface UserInterface {
  name?: string;
  role?: string;
  token?: string;
  picture?: string;
  email?: string;
  password?: string;
}
class UserController {
  public async findUsers(req: Request, res: Response): Promise<Response> {
    try {
      const users = await User.find();

      users.map(user => user.passwordHash = undefined);

      return res.status(200).json(users);
    } catch (error) {
      res.status(400).json({ error: 'Find users failed, try again' });
    }
  }

  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const { name, email, password, role, picture }: UserInterface = req.body;

      if (!name || !email || !password) return res.status(400).json({ message: 'Invalid values for new User!' });

      // User.findOne({ email }, { withDeleted: true });
      const findUser = await User.findOne({ email });

      if (findUser) return res.status(400).json({ message: 'User already exists' });

      const passwordHash = await bcrypt.hash(password, 10);

      const user = await User.create({ name, email, passwordHash, role, picture }).save();

      if (!user) return res.status(400).json({ message: 'Cannot create user' });

      user.passwordHash = undefined;

      res.status(201).json(user.id);
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: 'Registration failed, try again' });
    }
  }

  // o proprio usuario pode alterar os proprios dados exceto a ROLE;
  // o admin pode alterar role e email do usuario;
  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id;
      const { name, email, role, picture }: UserInterface = req.body;

      if (!id) return res.status(400).json({ message: 'Please send user id' });

      const user = await User.findOne(id);

      if (!user) return res.status(404).json({ message: 'Cannot find user' });

      const valuesToUpdate: UserInterface = {
        name: name || user.name,
        email: email || user.email,
        role: role || user.role,
        picture: picture || user.picture,
      };

      await User.update(id, { ...valuesToUpdate });

      return res.status(200).json({ message: 'Update successfully' } );
    } catch (error) {
      res.status(400).json({ error: 'Update failed, try again' });
    }
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id;

      if (!id) return res.status(400).json({ message: 'Please send user id' });

      const user = await User.findOne(id);

      if (!user) return res.status(404).json({ message: 'Cannot find user' });

      await User.softRemove(user);

      res.status(200).json();
    } catch (error) {
      res.status(400).json({ error: 'Remove failed, try again' });
    }
  }
}

export default new UserController();
