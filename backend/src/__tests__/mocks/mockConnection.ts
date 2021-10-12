import {createConnection, getConnection} from 'typeorm';

const connection = {
  async create(){
    await createConnection();
  },

  async close(){
    // await getConnection().dropDatabase(); // se precisar rodar novas migrations;
    await getConnection().close(); 
  },

  async clear(){
    await getConnection().synchronize(true)
  }
};

export default connection;
