import { Icon } from "@material-ui/core";
import { formatValue } from "data/utils/formatValue";
import { getNameInitials } from "data/utils/nameConfig";
import moment from "moment";
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
  startDate?: any;
  contactName: string;
  tag?: string;
  onClick: any;
}

const DealCard: React.FC<DealCardProps> = (props) => {
  const iconTag = useMemo(() => {
    if (props.tag === "HOT") {
      return { icon: "fire", color: "#e63706" };
    } else if (props.tag === "COLD") {
      return { icon: "snowflake-o", color: "#3eccf0" };
    } else {
      return { icon: "bolt", color: "#effa5c" };
    }
  }, [props.tag]);
  return (
    <DealCardContainer onClick={props.onClick}>
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
          <DealBudgetStyled>
            {formatValue(props.budget?.toString() || "0")}
          </DealBudgetStyled>
          <DealStartDateStyled>
            <Icon className="fa fa-calendar" fontSize="inherit" />
            {moment(props.startDate).format(" DD/MM/YYYY HH:MM")}
          </DealStartDateStyled>
        </DealFooterContainer>
      </DealDescriptionContainer>
      <Icon
        className={`fa fa-${iconTag.icon}`}
        fontSize="inherit"
        style={{ color: iconTag.color }}
        sx={{ mr: 0.5, position: "relative", bottom: 0 }}
      />
    </DealCardContainer>
  );
};
export default DealCard;
