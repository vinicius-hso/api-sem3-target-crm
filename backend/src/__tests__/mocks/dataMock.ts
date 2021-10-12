import Company from '@entities/Company';
import Contact from '@entities/Contact';
import Pipeline from '@entities/Pipeline';
import Deal from '@entities/Deal';
import User from '@entities/User';
import bcrypt from 'bcryptjs';

let userSeller;
let userAdmin;
export const mocks = async (): Promise<any> => {
  // Users
  const pass = await bcrypt.hash('password', 10);
  userSeller = await User.create({ name: 'seller', email: 'seller@seller.com', role: 'SELLER', passwordHash: pass }).save();
  userSeller = {...userSeller, password: 'password' };

  userAdmin = await User.create({ name: 'admin', email: 'admin@admin.com', role: 'ADMIN', passwordHash: pass }).save();
  userAdmin = {...userAdmin, password: 'password' };
  
  // Pipelines

  return { userSeller, userAdmin }
}
