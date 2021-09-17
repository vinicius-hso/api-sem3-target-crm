import React from "react";
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
function DealPipeline() {
  const { hasError, isLoading, dealsBudgetSum } = usePipelineComponent();

  return (
    <DealsPageContainer>
      <DeleteModal />
      <UpDateModal />
      <CreateModal />
      <CreateDealModal />
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
                <Typography>R$ {dealsBudgetSum()}</Typography>
                <i
                  className="fa fa-arrow-right"
                  style={{ position: "relative", top: "2px" }}
                ></i>
                <Typography>8 negociações</Typography>
              </div>
            }
          ></Title>
          <DealsTotalTagsContainer>
            <div>
              <i className="fa fa-fire" style={{ color: "#e63706" }}></i>
              <span> 5</span>
            </div>
            <div>
              <i className="fa fa-bolt" style={{ color: "#effa5c" }}></i>
              <span> 4</span>
            </div>
            <div>
              <i className="fa fa-snowflake-o" style={{ color: "#3eccf0" }}></i>
              <span> 2</span>
            </div>
          </DealsTotalTagsContainer>
        </TitleHeaderContainer>
        <SearchButtom
          placeholder="Buscar"
          buttomIcon="fa-search"
          viewButtonGroup={true}
          typeValue="value"
          searchTypes={[
            { value: 10, name: "coxinha" },
            { value: 10, name: "coxinha" },
            { value: 10, name: "coxinha" },
          ]}
          ChangeType={() => { }}
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
