import { createConnection } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config({
  path: process.env.NODE_ENV === 'test' ? '.env' : '.env',
});

// createConnection();

// mocks
import Contact from '@entities/Contact';
import Company from '@entities/Company';
import Pipeline from '@entities/Pipeline';
import User from '@entities/User';
import bcrypt from 'bcryptjs';
const mocks = async () => {
  await createConnection();
  if (!(await User.findOne({ email: 'admin@admin.com' }))) {
    const pass = await bcrypt.hash('password', 10);

    const user = await User.create({ name: 'admin', email: 'admin@admin.com', role: 'ADMIN', passwordHash: pass }).save();

    console.log('crete user', user.id);

    const pipeline = await Pipeline.create({ name: 'teste' }).save();

    console.log('create pipeline', pipeline.id);
    
    const company = await Company.create({ name: 'teste', country: 'BR', state: 'SP', city: 'SJC', site: 'www.teste.com' }).save();

    console.log('create company', company.id);

    const contact = await Contact.create({ company: company, name: 'teste', email: 'teste@teste.com', phone: '12 999999999', city: 'SJC', state: 'SP', tag: 'Tá frio!' }).save();

    console.log('create contact', contact.id);
  }
};

mocks();
