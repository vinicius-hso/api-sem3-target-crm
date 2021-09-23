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
import Deal from '@entities/Deal'
import User from '@entities/User';
import bcrypt from 'bcryptjs';
const mocks = async () => {
  // inserindo dados iniciais no Banco de dados;
  await createConnection();
  if (!(await User.findOne({ email: 'admin@admin.com' }))) {
    const pass = await bcrypt.hash('password', 10);

    const user = await User.create({ name: 'admin', email: 'admin@admin.com', role: 'ADMIN', passwordHash: pass }).save();

    console.log('crete user', user.id);

    const pipeline = await Pipeline.create({ name: 'teste' }).save();

    console.log('create pipeline', pipeline.id);
    
    const company = await Company.create({ name: 'teste', country: 'BR', state: 'SP', city: 'SJC', site: 'www.teste.com', picture: 'https://conteudo.imguol.com.br/c/entretenimento/54/2020/04/28/cachorro-pug-1588098472110_v2_900x506.jpg.webp' }).save();

    console.log('create company', company.id);

    const contact = await Contact.create({ company: company, name: 'teste', email: 'teste@teste.com', phone: '12 999999999', city: 'SJC', state: 'SP' }).save();

    console.log('create contact', contact.id);

    const deal = await Deal.create({ pipeline: pipeline, company: company, contact: contact, name: 'teste', deadline: (new Date()), priority: 'teste', value: 123, tag: 'COLD', activity: [{ type: 'teste', name: 'teste', description: 'testando', status: 'Concluida!', date: new Date(), createdBy: user.name }] }).save();

    console.log('create deal', deal.id);

    const insertActivity = deal.activity.push({ type: 'teste2', name: 'teste', description: 'testando', status: 'Concluida!', date: new Date(), createdBy: user.name, schedule: '12:00' });

    await deal.save();

    console.log('insert activity', insertActivity);
  }
};

mocks();
