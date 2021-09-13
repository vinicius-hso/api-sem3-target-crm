import React from "react";
import ContactCard from "ui/components/ContactCard/ContactCard";
//AINDA N ESTA EM USO... APENAS PARA TESTE DE LAYOUT
function Home() {
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
      <ContactCard
        name="Willian Rodrigues da silva"
        description="teste"
        rating={3}
      />
      <br />
      <ContactCard name="Mirian" description="teste" rating={3} />
      <br />
    </div>
  );
}
export default Home;
