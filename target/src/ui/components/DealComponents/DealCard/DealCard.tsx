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
    switch (props.tag) {
      case "HOT":
        return { icon: "fire", color: "#e63706" };
      case "COLD":
        return { icon: "snowflake-o", color: "#3eccf0" };
      case "WARM":
        return { icon: "bolt", color: "#effa5c" };
      default:
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
        <Tooltip
          title={props?.companyName}
          placement="top-start"
          enterDelay={500}
          leaveDelay={100}
        >
          <DealPictureStyled
            sx={{ ml: 0.5, mt: 0.5 }}
            src={props?.companyPicture}
            alt={props?.companyName}
          >
            {getNameInitials(props?.companyName)}
          </DealPictureStyled>
        </Tooltip>
      </div>
      <DealDescriptionContainer>
        <DealTitleStyled>{props?.title}</DealTitleStyled>
        <Tooltip
          title="Contato"
          placement="top-start"
          enterDelay={500}
          leaveDelay={100}
        >
          <DealTypeStyled>{props?.contactName}</DealTypeStyled>
        </Tooltip>
        <DealFooterContainer>
          <Tooltip
            title="Valor"
            placement="top-start"
            enterDelay={500}
            leaveDelay={100}
          >
            <DealBudgetStyled>
              {formatValue(props?.budget || 0)}
            </DealBudgetStyled>
          </Tooltip>
          <Tooltip
            title="Data de início"
            placement="top-start"
            enterDelay={500}
            leaveDelay={100}
          >
            <DealStartDateStyled>
              <Icon className="fa fa-calendar" fontSize="inherit" />
              {moment(props?.startDate).format(" DD/MM/YYYY HH:MM")}
            </DealStartDateStyled>
          </Tooltip>
        </DealFooterContainer>
      </DealDescriptionContainer>
      {iconTag.icon == "fire" && (
        <Tooltip
          title="Quente"
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
      {iconTag.icon == "snowflake-o" && (
        <Tooltip
          title="Fria"
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
      {iconTag.icon == "bolt" && (
        <Tooltip
          title="Morna"
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
export default DealCard;
