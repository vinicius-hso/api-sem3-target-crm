import {
  CompanyHeaderContainer,
  CompanyPageContainer,
} from "@styles/pagesStyle/company.style";
import React, { useContext } from "react";
import SearchButtom from "ui/components/SearchButton/SearchButton";
import Title from "ui/components/Title/Title";

function DealPipeline() {
  const [valueType, setValueType] = React.useState("");
  const handleChange = (event) => {
    setValueType(event.target.value);
  };

  return (
    <CompanyPageContainer>
      <CompanyHeaderContainer>
        <Title style={{ textAlign: "left" }} title="EMPRESAS"></Title>
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
      <hr />
    </CompanyPageContainer>
  );
}

export default DealPipeline;
