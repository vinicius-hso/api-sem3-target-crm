import Company from '@entities/Company';
import Contact from '@entities/Contact';
import Pipeline from '@entities/Pipeline';
import Deal from '@entities/Deal';
import User from '@entities/User';
import bcrypt from 'bcryptjs';

export const mocks = async (): Promise<any> => {
  // Users
  const pass = await bcrypt.hash('password', 10);
  const userSeller = await User.create({ name: 'seller', email: 'seller@seller.com', role: 'SELLER', passwordHash: pass }).save();

  const otherUserSeller = await User.create({
    name: 'seller',
    email: 'otherSeller@otherSeller.com',
    role: 'SELLER',
    passwordHash: pass,
  }).save();

  const userAdmin = await User.create({ name: 'admin', email: 'admin@admin.com', role: 'ADMIN', passwordHash: pass }).save();

  const company = await Company.create({
    name: 'Mochip',
    country: 'Brasil',
    state: 'SP',
    city: 'Botucatu',
    site: 'www.mochip.com.br',
    picture: 'https://cdn.pixabay.com/photo/2019/09/29/22/06/light-bulb-4514505_1280.jpg',
  }).save();

  // Pipelines

  return { userSeller, otherUserSeller, userAdmin, company };
};
