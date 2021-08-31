import React, { useMemo } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import theme from "ui/theme/theme";
import { experimentalStyled as styled } from "@material-ui/core/styles";

import {
  DealCardContainer,
  DealTitleStyled,
  DealTypeStyled,
  DealPictureStyled,
  DealBudgetStyled,
  DealStartDateStyled,
  DealDescriptionContainer,
  DealFooterContainer,
} from "./DealCard.style";
import DealCard from "../DealCard/DealCard";
import moment from "moment";
import { mockDeals } from "data/utils/mock";


const ColumnHeader = styled('div')`
  text-transform: uppercase;
  margin-bottom: 20px;
`;

const DroppableStyles = styled('div')`
  padding: 10px;
  border-radius: 6px;
  background: #d4d4d4;
`;
const DealCardList = (props) => {
  return (
    <div>
        <DroppableStyles>
    <ColumnHeader>{props.prefix}</ColumnHeader>
    <Droppable droppableId={`${props.prefix}`}>
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          {props.elements.map((deal, index) => (

        <Draggable key={deal.id} draggableId={String(deal.id)} index={index}>
          {(provided, snapshot) => (
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
                type={deal.type}
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
  </DroppableStyles>

    </div>
  );
};
export default DealCardList;
