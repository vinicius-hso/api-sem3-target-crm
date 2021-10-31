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

  // Company
  const company = await Company.create({
    id: "c0d140ad-3268-4587-b484-10f910334fe8",
    name: 'Geniv',
    country: 'Brasil',
    state: 'MG',
    city: 'Montes Claros',
    site: "www.geniv.com.br",
    picture: "https://cdn.pixabay.com/photo/2020/05/18/16/17/social-media-5187243_1280.png",
  }).save();

  // Pipelines
  const pipeline = await Pipeline.create({
    name: 'Pipeline',
  }).save();

  return { userSeller, otherUserSeller, userAdmin };
};
