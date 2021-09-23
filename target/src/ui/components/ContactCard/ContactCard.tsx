import { getNameInitials, getNameUpperCase } from "data/utils/nameConfig";
import React from "react";
import {
  ContactPictureStyled,
  ContactCardContainer,
  ContactDescriptionStyled,
  ContactNameStyled,
  ContactRatingStyled,
} from "./ContactCard.style";

//@deprecated
interface ContactCardProps {
  picture?: string;
  name: string;
  rating: number;
  description?: string;
}

const ContactCard: React.FC<ContactCardProps> = (props) => {
  return (
    <ContactCardContainer>
      <ContactPictureStyled src={props.picture}>
        {getNameInitials(props.name)}
      </ContactPictureStyled>
      <ContactNameStyled>{getNameUpperCase(props.name)}</ContactNameStyled>
      <ContactRatingStyled readOnly value={props.rating} />
      <ContactDescriptionStyled>{props.description}</ContactDescriptionStyled>
    </ContactCardContainer>
  );
};
export default ContactCard;
