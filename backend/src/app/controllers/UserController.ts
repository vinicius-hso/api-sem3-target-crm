import User from '@entities/User';
import transport from '@src/modules/mailer';
import generatePassword from '@src/utils/generatePassword';
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

      users.map((user) => (user.passwordHash = undefined));

      return res.status(200).json(users);
    } catch (error) {
      res.status(400).json({ error: 'Find users failed, try again' });
    }
  }

  public async findUserById(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id;

      const user = await User.findOne(id);
      
      if (!user) return res.status(404).json({ message: 'User not exist' });

      user.passwordHash = undefined;

      return res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ error: 'Find user failed, try again' });
    }
  }

  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const { name, email, role, picture }: UserInterface = req.body;

      if (!name || !email) return res.status(400).json({ message: 'Invalid values for new User!' });

      // User.findOne({ email }, { withDeleted: true });
      const findUser = await User.findOne({ email });

      if (findUser) return res.status(400).json({ message: 'User already exists' });

      const password = generatePassword();

      transport.sendMail({
        to: email,
        from: '"Contato" <api@contato.com>',
        subject: 'new user', // assunto do email
        template: 'newUser',

        context: { password },
      },
      (err) => {
        if (err) console.log('Email not sent')

        transport.close();
      });

      const passwordHash = await bcrypt.hash(password, 10);

      const user = await User.create({ name, email, passwordHash, role, picture }).save();

      if (!user) return res.status(400).json({ message: 'Cannot create user' });

      user.passwordHash = undefined;

      res.status(201).json(user.id);
    } catch (error) {
      res.status(400).json({ error: 'Registration failed, try again' });
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id;
      const requesterId = req.userId;
      const { name, email, role, picture }: UserInterface = req.body;

      if (!id) return res.status(400).json({ message: 'Please send user id' });

      const user = await User.findOne(id);

      if (!user) return res.status(404).json({ message: 'Cannot find user' });

      const isOwner = requesterId === user.id ? true : false;

      let valuesToUpdate: UserInterface;

      if (isOwner && user.role === 'ADMIN') {
        //case Owner and Admin
        valuesToUpdate = {
          name: name || user.name,
          role: role || user.role,
          email: email || user.email,
          picture: picture || user.picture,
        };
      } else if (isOwner) {
        // case Owner
        valuesToUpdate = {
          name: name || user.name,
          email: email || user.email,
          picture: picture || user.picture,
        };
      } else {
        // case Admin;
        valuesToUpdate = {
          role: role || user.role,
          email: email || user.email,
        };
      }

      await User.update(id, { ...valuesToUpdate });

      return res.status(200).json();
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
