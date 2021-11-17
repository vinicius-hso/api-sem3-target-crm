import { getNameInitials, getNameUpperCase } from "data/utils/nameConfig";
import React from "react";
import {
  CompanyPictureStyled,
  CompanyCardContainer,
  CompanyCityStyled,
  CompanyNameStyled,
  CompanyEmailStyled,
} from "./CompanyCard.style";

interface CompanyCardProps {
  picture?: string;
  name: string;
  city: string;
  state?: string;
  email?: string;
  onClick: any;
}

const CompanyCard: React.FC<CompanyCardProps> = (props) => {
  return (
    <>
      <CompanyCardContainer onClick={props.onClick}>
        <CompanyPictureStyled src={props.picture}>
          {getNameInitials(props.name)}
        </CompanyPictureStyled>
        <CompanyNameStyled>{getNameUpperCase(props.name)}</CompanyNameStyled>
        <CompanyCityStyled>
          {props.city} {props.state ? "-" : ""} {props.state}
        </CompanyCityStyled>
        <CompanyEmailStyled>{props.email || "Não Possui"}</CompanyEmailStyled>
      </CompanyCardContainer>
    </>
  );
};
export default CompanyCard;
