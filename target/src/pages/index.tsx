import Title from "ui/components/Title/Title";
import ContactCard from "ui/components/ContactCard/ContactCard";
import TextFieldMask from "ui/components/Input/TextFieldMask/TextFieldMask";

export default function Home() {
  return (
    <div>
      <Title
        title={"Seja bem vindo!"}
        subtitle={<p>Faça seu login para acessar sua area restrita.</p>}
      ></Title>
      <TextFieldMask
        label={"Placeholder"}
        fullWidth
        variant={"outlined"}
        mask={"(99) 9 9999-9999"}
        icon="fa fa-facebook"
      />
      <TextFieldMask
        label={"teste"}
        fullWidth
        variant={"outlined"}
        icon="fa fa-eye"
      />
      <ContactCard
        name="Contact"
        picture={
          "https://avatars.githubusercontent.com/u/57255222?s=400&u=6fac4383a94553b8987954882444ba7e826e4092&v=4"
        }
        description="teste"
        rating={3}
      />
      <br />
      <ContactCard name="Willian Rodrigues" description="teste" rating={3} />
    </div>
  );
}
