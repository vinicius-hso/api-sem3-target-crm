import Title from "ui/components/Title/Title";
import ContactCard from "ui/components/ContactCard/ContactCard";

export default function Home() {
  return (
    <div>
      <Title
        title={"Seja bem vindo!"}
        subtitle={<p>Faça seu login para acessar sua area restrita.</p>}
      ></Title>
      <ContactCard />
    </div>
  );
}
