// mocks
import { companies, contacts, users, pipelines, deals, deals2, deals3, deals4 } from './dataMock';
import Company from '@entities/Company';
import Contact from '@entities/Contact';
import Pipeline from '@entities/Pipeline';
import Deal from '@entities/Deal';
import User from '@entities/User';
import bcrypt from 'bcryptjs';

const mocks = async (): Promise<void> => {
  // inserindo dados iniciais no Banco de dados;
  try {
    if (!(await User.findOne({ email: 'admin@admin.com' }))) {
      const pass = await bcrypt.hash('password', 10);

      await User.create({ name: 'admin', email: 'admin@admin.com', role: 'ADMIN', passwordHash: pass }).save();
    }

    if (!(await Pipeline.findOne({ name: 'Lead' }))) {
      pipelines.map(async (pipeline) => await Pipeline.create({ ...pipeline }).save());

      console.log('pipelines ok');
    }

    if (!(await Company.findOne({ name: 'Geniv' }))) {
      companies.map(async (company) => await Company.create({ ...company }).save());

      console.log('companies ok');
    }

    if (!(await User.findOne({ email: 'jonathan.assis@fatec.sp.gov.br' }))) {
      users.map(async (seller) => {
        const passwordHash = await bcrypt.hash(seller.password, 10);
        await User.create({ ...seller, passwordHash }).save();
      });

      console.log('users ok');
    }

    const companiesFind = await Company.find();
    if (!(await Contact.findOne({ email: 'adriano_silveira@gmail.com' })) && companiesFind.length >= 5) {
      contacts.map(async (contact, index) => {
        await Contact.create({ ...contact, company: companiesFind[index] }).save();
      });

      console.log('contacts ok');
    }

    const contactFind = await Contact.find();
    const userFind = await User.find();
    const pipelineFind = await Pipeline.find();
    if (
      !(await Deal.findOne({ name: 'Gynamedic' })) &&
      contactFind.length >= 5 &&
      pipelineFind.length >= 5 &&
      companiesFind.length >= 5
    ) {
      deals.map(async (deal, index) => {
        await Deal.create({
          ...deal,
          pipeline: pipelineFind[index],
          company: companiesFind[index],
          contact: contactFind[index],
          activity: [
            {
              name: 'teste',
              description: 'testando',
              createdAt: new Date(),
              createdBy: { id: userFind[index].id, name: userFind[index].name },
              tag: 'COLD',
            },
          ],
        }).save();
      });

      deals2.map(async (deal, index) => {
        await Deal.create({
          ...deal,
          pipeline: pipelineFind[index],
          company: companiesFind[index],
          contact: contactFind[index],
          // status: 'WON',
          activity: [
            {
              name: 'teste',
              description: 'testando',
              createdAt: new Date(),
              createdBy: { id: userFind[index].id, name: userFind[index].name },
              tag: 'COLD',
            },
          ],
        }).save();
      });

      deals3.map(async (deal, index) => {
        await Deal.create({
          ...deal,
          pipeline: pipelineFind[index],
          company: companiesFind[index],
          contact: contactFind[index],
          // status: 'LOST',
          activity: [
            {
              name: 'teste',
              description: 'testando',
              createdAt: new Date(),
              createdBy: { id: userFind[index].id, name: userFind[index].name },
              tag: 'COLD',
            },
          ],
        }).save();
      });

      deals4.map(async (deal, index) => {
        await Deal.create({
          ...deal,
          pipeline: pipelineFind[index],
          company: companiesFind[index],
          contact: contactFind[index],
          // status: 'ARCHIVED',
          activity: [
            {
              name: 'teste',
              description: 'testando',
              createdAt: new Date(),
              createdBy: { id: userFind[index].id, name: userFind[index].name },
              tag: 'COLD',
            },
          ],
        }).save();
      });

      console.log('deals ok');
    }

    const dealsFind = await Deal.find();
    if (!dealsFind.length) mocks();
  } catch (error) {
    console.log('Erro ao rodar mocks!');
  }
};

export default mocks;
