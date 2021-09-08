import React, { useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { experimentalStyled as styled } from "@material-ui/core/styles";
import DealCard from "../DealCard/DealCard";
import {
  DroppableStyles,
  ColumnHeader,
  ColumnContainer,
  TitleColumnContainer,
} from "./DealCard.style";
import Title from "ui/components/Title/Title";
import { Typography } from "@material-ui/core";

const DealCardList = (props) => {
  return (
    <ColumnContainer>
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
      <DroppableStyles>
        <div>
          <Droppable droppableId={`${props.pipeId}`}>
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {props.elements.map((deal, index) => (
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
                ))}
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
