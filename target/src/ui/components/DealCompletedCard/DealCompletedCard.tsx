import { Icon, Tooltip } from "@material-ui/core";
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
} from "./DealCompletedCard.style";

export interface DealCardProps {
  companyName: string;
  companyPicture?: string;
  title: string;
  budget: number;
  startDate?: any;
  contactName: string;
  status?: string;
  onClick: any;
  style?: any;
}

const DealCompletedCard: React.FC<DealCardProps> = (props) => {
  const iconTag = useMemo(() => {
    switch (props.status) {
      case "WON":
        return { icon: "thumbs-o-up", color: "#03f518" };
      case "LOST":
        return { icon: "thumbs-o-down", color: "#e63706" };
      case "ARCHIVED":
        return { icon: "archive", color: "#01306e" };
      default:
        return { icon: "bolt", color: "#effa5c" };
    }
  }, [props.status]);
  return (
    <DealCardContainer onClick={props.onClick} style={props.style}>
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
          <DealBudgetStyled>{formatValue(props.budget || 0)}</DealBudgetStyled>
          <DealStartDateStyled>
            <Icon className="fa fa-calendar" fontSize="inherit" />
            {moment(props.startDate).format(" DD/MM/YYYY HH:MM")}
          </DealStartDateStyled>
        </DealFooterContainer>
      </DealDescriptionContainer>
      {iconTag.icon === "thumbs-o-up" && (
        <Tooltip
          title="Ganha"
          placement="top-start"
          enterDelay={500}
          leaveDelay={100}
        >
          <Icon
            className={`fa fa-${iconTag.icon}`}
            fontSize="inherit"
            style={{ color: iconTag.color }}
            sx={{ mr: 0.5, position: "relative", bottom: 0 }}
          />
        </Tooltip>
      )}
      {iconTag.icon === "thumbs-o-down" && (
        <Tooltip
          title="Perdida"
          placement="top-start"
          enterDelay={500}
          leaveDelay={100}
        >
          <Icon
            className={`fa fa-${iconTag.icon}`}
            fontSize="inherit"
            style={{ color: iconTag.color }}
            sx={{ mr: 0.5, position: "relative", bottom: 0 }}
          />
        </Tooltip>
      )}
      {iconTag.icon === "archive" && (
        <Tooltip
          title="Arquivada"
          placement="top-start"
          enterDelay={500}
          leaveDelay={100}
        >
          <Icon
            className={`fa fa-${iconTag.icon}`}
            fontSize="inherit"
            style={{ color: iconTag.color }}
            sx={{ mr: 0.5, position: "relative", bottom: 0 }}
          />
        </Tooltip>
      )}
    </DealCardContainer>
  );
};
export default DealCompletedCard;
