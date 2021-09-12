import React, { useState, useContext } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import DealCard from "../DealCard/DealCard";
import { DroppableStyles, ColumnContainer } from "./DealCard.style";
import Title from "ui/components/Title/Title";
import { Button, ButtonGroup, Typography } from "@material-ui/core";
import { mockAddCard } from "data/utils/mock";
import ModalContext from "contexts/ModalContext";

const DealCardList = (props) => {
  const [viewButtonGroup, setViewButtonGroup] = useState(false);

  function addCardtoList(pipeId: string) {
    props.elements.push(mockAddCard);
    console.log(props);
  }
  const { useDeleteModal, useUpdateModal, useCreateModal } = useContext(ModalContext);

  return (
    <ColumnContainer>
      <div style={{ position: "relative" }}>
        <Button
          color="primary"
          size="small"
          sx={{ position: "absolute", right: "0" }}
          onClick={() => {
            setViewButtonGroup(!viewButtonGroup);
          }}
        >
          <i className="fa fa-chevron-down"></i>
        </Button>
        {viewButtonGroup ? (
          <ButtonGroup
            sx={{
              position: "absolute",
              right: "0",
              top: "20px",
              zIndex: "10",
            }}
            orientation="vertical"
            color="primary"
            aria-label="vertical contained primary button group"
            variant="contained"
          >
            <Button
              sx={{ display: "flex", justifyContent: "start", gap: "10px" }}
            >
              <i className="fa fa-plus-circle" aria-hidden="true"></i>
              Nova negociação
            </Button>
            <Button onClick={() =>useCreateModal()}
              sx={{ display: "flex", justifyContent: "start", gap: "10px" }}
            >
              <i className="fa fa-plus-circle" aria-hidden="true"></i>
              Novo pipeline
            </Button>
            <Button onClick={() => useUpdateModal()}
              sx={{ display: "flex", justifyContent: "start", gap: "10px" }}
            >
              <i className="fa fa-pencil" aria-hidden="true"></i>
              Editar pipeline
            </Button>
            <Button
              onClick={() => useDeleteModal()}
              sx={{ display: "flex", justifyContent: "start", gap: "10px" }}
            >
              <i className="fa fa-trash" aria-hidden="true"></i>
              Deletar pipeline
            </Button>
          </ButtonGroup>
        ) : (
          ""
        )}
        <Title
          title={props.title}
          subtitle={
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <Typography>R$ 12.257,75</Typography>
              <i
                className="fa fa-arrow-right"
                style={{ position: "relative", top: "1px" }}
              ></i>
              <Typography>8 negociações</Typography>
            </div>
          }
        ></Title>
      </div>
      <DroppableStyles>
        <div>
          <Droppable droppableId={`${props.pipeId}`}>
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {props.elements.length !== 0 ? (
                  props.elements.map((deal, index) => (
                    <Draggable
                      key={deal.id}
                      draggableId={String(deal.id)}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                        >
                          <DealCard
                            title={deal.title}
                            companyName={deal.companyName}
                            companyPicture={deal.companyPicture}
                            contactName={deal.contactName}
                            budget={deal.budget}
                            startDate={deal.startDate}
                            tag={deal.tag}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))
                ) : (
                  <Button
                    variant="contained"
                    sx={{ width: "100%", height: "30px" }}
                    color="primary"
                    onClick={() => {
                      addCardtoList(props.pipeId);
                    }}
                    type="submit"
                  >
                    <i className="fa fa-plus"></i>
                  </Button>
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DroppableStyles>
    </ColumnContainer>
  );
};
export default DealCardList;
