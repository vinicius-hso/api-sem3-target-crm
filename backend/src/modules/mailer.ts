import path from 'path';
import mailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';
import { host, user, pass } from '@config/mail.json';

const transport = mailer.createTransport({
  service: 'gmail',
  host,
  auth: {
    user,
    pass,
  },
});

transport.use(
  'compile',
  hbs({
    viewEngine: {
      defaultLayout: undefined,
      partialsDir: path.resolve('./src/resources/mail/'),
    },
    viewPath: path.resolve('./src/resources/mail/'), // resolve parte sempre da raiz absoluta do projeto.
    extName: '.html',
  })
);

export default transport;
