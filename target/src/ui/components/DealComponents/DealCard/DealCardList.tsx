import React, { useMemo } from "react";
import { Draggable } from "react-beautiful-dnd";
import theme from "ui/theme/theme";
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

export interface DealCardProps {
  companyName: string;
  companyPicture?: string;
  title: string;
  budget: number;
  type?: string;
  startDate?: any;
  contactName: string;
  tag?: string;
  dragging?: boolean;
  ref?: any;
  style?: any;
}
const DealCardList = (props) => {
  return (
    <div>
      {mockDeals.map((deal, index) => (
        <Draggable key={deal.id} draggableId={String(deal.id)} index={index}>
          {(provided, snapshot) => (
            <div
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
            >
              <DealCard
                index={index}
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
    </div>
  );
};
export default DealCardList;
