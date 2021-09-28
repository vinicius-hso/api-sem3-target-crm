import { Container, Toolbar } from "@material-ui/core";
import { getNameInitials, getNameUpperCase } from "data/utils/nameConfig";
import React from "react";
import {
  ContactPictureStyled,
  ContactCardContainer,
  ContactCityStyled,
  ContactNameStyled,
  ContactPhoneStyled,
  ContactCompanyStyled,
} from "./ContactCard.style";

//@deprecated
interface CompanyCardProps {
  picture?: string;
  name: string;
  city: string;
  state?: string;
  company: string;
  phone: string;
}

const CompanyCard: React.FC<CompanyCardProps> = (props) => {
  return (
    <ContactCardContainer>
      <ContactPictureStyled src={props.picture}>
        {getNameInitials(props.name)}
      </ContactPictureStyled>
      <ContactNameStyled>{getNameUpperCase(props.name)}</ContactNameStyled>
      <ContactCompanyStyled>{props.company}</ContactCompanyStyled>
      <ContactPhoneStyled>{props.phone || "Não Possui"}</ContactPhoneStyled>
      <ContactCityStyled>
        {props.city} {props.state ? "-" : ""} {props.state}
      </ContactCityStyled>
    </ContactCardContainer>
  );
};
export default CompanyCard;
