import { formatPhone } from "data/utils/formatPhone";
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

interface ContactCardProps {
  picture?: string;
  name: string;
  city: string;
  state?: string;
  company: string;
  phone: string;
  onClick: () => void;
}

const CompanyCard: React.FC<ContactCardProps> = (props) => {
  return (
    <ContactCardContainer onClick={() => props.onClick()}>
      <ContactPictureStyled src={props.picture}>
        {getNameInitials(props.name)}
      </ContactPictureStyled>
      <ContactNameStyled>{getNameUpperCase(props.name)}</ContactNameStyled>
      <ContactCompanyStyled>{props.company}</ContactCompanyStyled>
      <ContactPhoneStyled>
        {formatPhone(props.phone) || "Não Possui"}
      </ContactPhoneStyled>
      <ContactCityStyled>
        {props.city} {props.state ? "-" : ""} {props.state}
      </ContactCityStyled>
    </ContactCardContainer>
  );
};
export default CompanyCard;
