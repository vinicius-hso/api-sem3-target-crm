import { Button, Typography } from '@material-ui/core';
import Title from "ui/components/Title/Title";
import ContactCard from "ui/components/ContactCard/ContactCard";
import TextFieldMask from "ui/components/Input/TextFieldMask/TextFieldMask";
import { FormContainer } from '@styles/pagesStyle/index.styles';

export default function Home() {
  return (
    <div>
      <ContactCard
        name="Contact"
        picture={
          "https://avatars.githubusercontent.com/u/57255222?s=400&u=6fac4383a94553b8987954882444ba7e826e4092&v=4"
        }
        description="teste"
        rating={3}
        />
      <br />
      <ContactCard name="Willian Rodrigues da silva" description="teste" rating={3} />
      <br />
      <ContactCard name="Mirian" description="teste" rating={3} />
    </div>
  )
}
