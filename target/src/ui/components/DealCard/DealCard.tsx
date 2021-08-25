import { getNameInitials } from "data/utils/nameConfig";
import React from "react";
import {
  DealCardContainer,
  DealTitleStyled,
  DealTypeStyled,
  DealPictureStyled,
  DealBudgetStyled,
  DealStartDateStyled,
  DealDescriptionContainer,
  DealFooterContainer
} from "./DealCard.style";

interface DealCardProps {
  picture?: string[];
  title: string;
  budget: number;
  type?: string;
  startDate?: any;
}

const DealCard: React.FC<DealCardProps> = (props) => {

  return (
    <DealCardContainer >
      <DealPictureStyled src={props.picture[0]}>
        {getNameInitials(props.picture[1])}
      </DealPictureStyled>
      <DealDescriptionContainer>
        <DealTitleStyled>{props.title}</DealTitleStyled>
        <DealFooterContainer>
          <DealTypeStyled>{props.type}, </DealTypeStyled>
        <DealBudgetStyled>R$ {props.budget.toFixed(2)}</DealBudgetStyled>
        </DealFooterContainer>
          <DealStartDateStyled><i className="fa fa-calendar"/> {props.startDate}</DealStartDateStyled>
      </DealDescriptionContainer>
    </DealCardContainer>
  );
};
export default DealCard;
