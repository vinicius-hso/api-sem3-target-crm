import React from "react";
import {
  CardsContainer,
  CompanyHeaderContainer,
  CompanyPageContainer,
} from "@styles/pagesStyle/company.style";
import { useCompanyPage } from "data/services/hooks/PageHooks/CompanyHook";
import CompanyCard from "ui/components/CompanyCard/CompanyCard";
import SearchButtom from "ui/components/SearchButton/SearchButton";
import Title from "ui/components/Title/Title";

function DealPipeline() {
  const { companies } = useCompanyPage();
  const [valueType, setValueType] = React.useState("");
  const handleChange = (event) => {
    setValueType(event.target.value);
  };

  return (
    <CompanyPageContainer>
      <CompanyHeaderContainer>
        <Title title="EMPRESAS"></Title>
        <SearchButtom
          placeholder="Buscar"
          buttomIcon="fa-search"
          viewButtonGroup={true}
          typeValue={valueType}
          searchTypes={[
            { value: 10, name: "Nome" },
            { value: 20, name: "Empresa" },
            { value: 30, name: "Contato" },
            { value: 40, name: "Tag" },
          ]}
          ChangeType={handleChange}
        />
      </CompanyHeaderContainer>
      <hr style={{ width: "90%" }} />
      <CardsContainer>
        {companies.map((company) => (
          <CompanyCard
            key={company.id}
            name={company.name}
            city={company.city}
            state={company.state}
            email={company.site}
            picture={company.picture}
          />
        ))}
      </CardsContainer>
    </CompanyPageContainer>
  );
}

export default DealPipeline;
