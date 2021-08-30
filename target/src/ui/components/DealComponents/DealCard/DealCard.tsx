import { Icon } from "@material-ui/core";
import { getNameInitials } from "data/utils/nameConfig";
import React, { useMemo } from "react";
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
  key?: string;
  index?: number;
}

const DealCard: React.FC<DealCardProps> = (props) => {
  const iconTag = useMemo(() => {
    if (props.tag === "hot") {
      return { icon: "fire", color: "#e63706" };
    } else if (props.tag === "cold") {
      return { icon: "snowflake", color: "#3eccf0" };
    } else {
      return { icon: "bolt", color: "#f4ff55" };
    }
  }, [props.tag]);
  return (
    <DealCardContainer ref={props.ref} style={props.style}>
      <div
        style={{
          backgroundColor: theme.palette.grey[50],
          borderRadius: "5px",
        }}
      >
        <DealPictureStyled
          sx={{ ml: 0.5, mt: 0.5 }}
          src={props.companyPicture}
          alt={props.companyName}
        >
          {getNameInitials(props.companyName)}
        </DealPictureStyled>
      </div>
      <DealDescriptionContainer>
        <DealTitleStyled>{props.title}</DealTitleStyled>
        <DealTypeStyled>{props.contactName}</DealTypeStyled>
        <DealFooterContainer>
          <DealBudgetStyled>R$ {props.budget.toFixed(2)}</DealBudgetStyled>
          <DealStartDateStyled>
            <Icon className="fa fa-calendar" fontSize="inherit" />
            {props.startDate}
          </DealStartDateStyled>
        </DealFooterContainer>
      </DealDescriptionContainer>
      <Icon
        className={`fa fa-${iconTag.icon}`}
        fontSize="inherit"
        style={{ color: iconTag.color }}
        sx={{ mr: 0.5, mt: 0.5 }}
      />
    </DealCardContainer>
  );
};
export default DealCard;
