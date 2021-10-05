const companies = [
  {
    name: 'Mochip',
    country: 'Brasil',
    state: 'SP',
    city: 'Botucatu',
    site: 'www.mochip.com.br',
    picture: 'https://cdn.pixabay.com/photo/2019/09/29/22/06/light-bulb-4514505_1280.jpg',
  },
  {
    name: 'Astack',
    country: 'Brasil',
    state: 'RJ',
    city: 'Rio de Janeiro',
    site: 'www.astack.com.br',
    picture: 'https://cdn.pixabay.com/photo/2014/11/16/23/39/superhero-534120_1280.jpg',
  },
  {
    name: 'Sshare',
    country: 'Brasil',
    state: 'SC',
    city: 'Jaraguá do Sul',
    site: 'www.sshare.com.br',
    picture: 'https://cdn.pixabay.com/photo/2017/04/25/22/28/despaired-2261021_1280.jpg',
  },
  {
    name: 'Dronix',
    country: 'Brasil',
    state: 'BA',
    city: 'Salvador',
    site: 'www.dronix.com.br',
    picture: 'https://cdn.pixabay.com/photo/2020/05/20/03/50/gears-5193383_1280.png',
  },
  {
    name: 'Geniv',
    country: 'Brasil',
    state: 'MG',
    city: 'Montes Claros',
    site: 'www.geniv.com.br',
    picture: 'https://cdn.pixabay.com/photo/2020/05/18/16/17/social-media-5187243_1280.png',
  },
];

const contacts = [
  {
    name: 'Nicole Albuquerque',
    email: 'nicole_albuquerque@gmail.com',
    phone: '+5512987789556',
    city: 'Rio de Janeiro',
    state: 'RJ',
  },
  {
    name: 'Olívia da Silva',
    email: 'olivia_dasilva@gmail.com',
    phone: '+5512986989556',
    city: 'Jaraguá do Sul',
    state: 'SC',
  },
  {
    name: 'Maísa Oliveira',
    email: 'maisa_oliveira@gmail.com',
    phone: '+5512986989543',
    city: 'Salvador',
    state: 'BA',
  },
  {
    name: 'Emanuel Kant',
    email: 'kant_emanuel@gmail.com',
    phone: '+5512987889543',
    city: 'Montes Claros',
    state: 'MG',
  },
  {
    name: 'Adriano Silveira',
    email: 'adriano_silveira@gmail.com',
    phone: '+5512987979532',
    city: 'Rio de Janeiro',
    state: 'RJ',
  },
];

const users = [
  {
    name: 'Vinícius Oliveira',
    email: 'viniciushsoliveira@gmail.com',
    role: 'SELLER',
    password: 'AbC123',
  },
  {
    name: 'Mariana Assis',
    email: 'mariana.assis01@fatec.sp.gov.br',
    role: 'SELLER',
    password: 'ABc123',
  },
  {
    name: 'Hariel Thums',
    email: 'hariel.rigelli@fatec.sp.gov.br',
    role: 'SELLER',
    password: 'aBC123',
  },
  {
    name: 'Will Rodrigues',
    email: 'willian.silva109@fatec.sp.gov.br',
    role: 'SELLER',
    password: 'abC123',
  },
  {
    name: 'Debora Faria',
    email: 'debora.faria01@fatec.sp.gov.br',
    role: 'SELLER',
    password: 'aBc123',
  },
  {
    name: 'Sarah Ribeiro',
    email: 'sarah.silva10@fatec.sp.gov.br',
    role: 'SELLER',
    password: 'abc456',
  },
  {
    name: 'John Assis',
    email: 'jonathan.assis@fatec.sp.gov.br',
    role: 'SELLER',
    password: 'abc654',
  },
];

const pipelines = [
  {
    name: 'Lead',
  },
  {
    name: 'Reconhecimento de oportunidade',
  },
  {
    name: 'Proposta',
  },
  {
    name: 'Negociação',
  },
  {
    name: 'Fechando',
  },
];

const deals = [
  {
    name: 'Medicine Den',
    deadline: new Date(),
    priority: 'high',
    value: 1597,
  },
  {
    name: 'Physician.ly',
    deadline: new Date(),
    priority: 'high',
    value: 2584,
  },
  {
    name: 'Bimedical',
    deadline: new Date(),
    priority: 'medium',
    value: 2584,
  },
  {
    name: 'Medpharm',
    deadline: new Date(),
    priority: 'low',
    value: 4181,
  },
  {
    name: 'Gynamedic',
    deadline: new Date(),
    priority: 'medium',
    value: 6765,
  },
];

export { companies, contacts, users, pipelines, deals };
