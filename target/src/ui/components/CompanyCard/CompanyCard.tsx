import { Container, Toolbar } from "@material-ui/core";
import { getNameInitials, getNameUpperCase } from "data/utils/nameConfig";
import React from "react";
import {
  CompanyPictureStyled,
  CompanyCardContainer,
  CompanyCityStyled,
  CompanyNameStyled,
  CompanyEmailStyled,
} from "./CompanyCard.style";

//@deprecated
interface CompanyCardProps {
  picture?: string;
  name: string;
  city: string;
  state?: string;
  email?: string;
}

const CompanyCard: React.FC<CompanyCardProps> = (props) => {
  return (
    <CompanyCardContainer>
      <CompanyPictureStyled src={props.picture}>
        {getNameInitials(props.name)}
      </CompanyPictureStyled>
      <CompanyNameStyled>{getNameUpperCase(props.name)}</CompanyNameStyled>
      <CompanyCityStyled>
        {props.city} {props.state ? "-" : ""} {props.state}
      </CompanyCityStyled>
      <CompanyEmailStyled>{props.email || "Não Possui"}</CompanyEmailStyled>
    </CompanyCardContainer>
  );
};
export default CompanyCard;
