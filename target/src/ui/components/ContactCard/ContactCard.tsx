import { Container, Toolbar } from "@material-ui/core";
import { getNameInitials } from "data/utils/getNameInitials";
import React from "react";
import {
  ContactAvatarStyled,
  ContactCardContainer,
  ContactDescriptionStyled,
  ContactNameStyled,
  ContactRatingStyled,
} from "./ContactCard.style";

interface ContactCardProps {
  picture?: string;
  name: string;
  rating: number;
  description?: string;
}

const ContactCard: React.FC<ContactCardProps> = (props) => {
  return (
    <ContactCardContainer>
      <ContactAvatarStyled src={props.picture}>
        {getNameInitials(props.name)}
      </ContactAvatarStyled>
      <ContactNameStyled>{props.name}</ContactNameStyled>
      <ContactRatingStyled readOnly value={props.rating} />
      <ContactDescriptionStyled>{props.description}</ContactDescriptionStyled>
    </ContactCardContainer>
  );
};
export default ContactCard;
