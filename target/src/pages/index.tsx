import { Button, Typography } from '@material-ui/core';
import Title from "ui/components/Title/Title";
import DealCard from "ui/components/DealCard/DealCard";
import TextFieldMask from "ui/components/Input/TextFieldMask/TextFieldMask";
import { FormContainer } from '@styles/pagesStyle/index.styles';
import { useEffect } from 'react';
import { api } from 'data/services/serviceApi';
import moment from 'moment';

export default function Home() {

/*   
  useEffect(() => {
    async function backAccess(){
      const request = await api.get('/contacts')
      console.log(request);
    }
    backAccess();
  },[])
 */
  return (
    <div>
      <Title
        title={"Seja bem vindo!"}
        subtitle={<p>Faça login para acessar sua area restrita.</p>}
      ></Title>
      <FormContainer>
        <TextFieldMask
          label={"email"}
          fullWidth
          variant={"outlined"}
          icon="fa fa-user"
          size="small"
        />
        <TextFieldMask
          fullWidth
          label={"senha"}
          variant={"outlined"}
          icon="fa fa-key"
          type="password"
          size="small"
        />
        <Typography color='error'> <i className='fa fa-info-circle'/> Usuario ou senha incorreto, tente novamente ou clique em "Redefinir senha" <br/> para redefini-la</Typography>
        <Button
          variant="contained"
          sx={{width: '200px'}}
          color="secondary"
          
        >
          Entrar
        </Button>
      </FormContainer>
      <DealCard 
        title="Usuario ou senha incorreto"
        picture={
          ["https://avatars.githubusercontent.com/u/57255222?s=400&u=6fac4383a94553b8987954882444ba7e826e4092&v=4", 'Company']
        }
        type="teste"
        budget={3}
        startDate={moment().format('DD/MM/YYYY HH:MM')}  
      />
    </div>
  );
}
