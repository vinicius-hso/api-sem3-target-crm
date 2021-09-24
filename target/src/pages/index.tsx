import React, { useContext } from "react";
import ScrumBoard from "data/services/servicesComponents/ScrumBoard";
import { usePipelineComponent } from "data/services/hooks/componentHooks/PipelineHook";
import { CircularProgress, Typography } from "@material-ui/core";
import {
  DealsHeaderContainer,
  DealsPageContainer,
  DealsTotalTagsContainer,
  PipelinesContainer,
  TitleHeaderContainer,
} from "@styles/pagesStyle/deals.style";
import Title from "ui/components/Title/Title";
import DeleteModal from "ui/components/Modal/DeleteModal";
import UpDateModal from "ui/components/Modal/UpDateModal";
import CreateModal from "ui/components/Modal/CreateModal";
import CreateDealModal from "ui/components/Modal/CreateDealModal";
import SearchButtom from "ui/components/SearchButton/SearchButton";
import PipelineContext from "contexts/PipelineContext";
import { formatValue } from "data/utils/formatValue";
import DetailModal from "ui/components/Modal/DealDetailModal";

function DealPipeline() {
  const { hasError, isLoading, getDealsInfo } = usePipelineComponent();
  const { dealTotalParams } = useContext(PipelineContext);
  const [valueType, setValueType] = React.useState("");
  const handleChange = (event) => {
    setValueType(event.target.value);
  };

  return (
    <DealsPageContainer>
      <DeleteModal />
      <UpDateModal />
      <CreateModal />
      <CreateDealModal />
      <DetailModal />
      <DealsHeaderContainer>
        <TitleHeaderContainer>
          <Title
            title="PIPELINE"
            subtitle={
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "10px",
                }}
              >
                <Typography>
                  {formatValue(dealTotalParams.budgetSum)}
                </Typography>
                <i
                  className="fa fa-arrow-right"
                  style={{ position: "relative", top: "2px" }}
                ></i>
                <Typography>
                  {dealTotalParams.totalDeals} negociações
                </Typography>
              </div>
            }
          ></Title>
          <DealsTotalTagsContainer>
            <div>
              <i className="fa fa-fire" style={{ color: "#e63706" }}></i>
              <span> {dealTotalParams.hotDeals}</span>
            </div>
            <div>
              <i className="fa fa-bolt" style={{ color: "#effa5c" }}></i>
              <span> {dealTotalParams.warmDeals}</span>
            </div>
            <div>
              <i className="fa fa-snowflake-o" style={{ color: "#3eccf0" }}></i>
              <span> {dealTotalParams.coldDeals}</span>
            </div>
          </DealsTotalTagsContainer>
        </TitleHeaderContainer>
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
      </DealsHeaderContainer>
      <PipelinesContainer>
        {isLoading ? (
          <div style={{ textAlign: "center" }}>
            <CircularProgress />
          </div>
        ) : !isLoading && hasError ? (
          <div>{hasError}</div>
        ) : (
          <ScrumBoard />
        )}
      </PipelinesContainer>
    </DealsPageContainer>
  );
}

export default DealPipeline;
