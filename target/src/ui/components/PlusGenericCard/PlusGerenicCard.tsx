import React from "react";
import { PlusGerenicCardContainer } from "./PlusGenericCard.style";

const PlusGerenicCard = (props) => {
  return (
    <PlusGerenicCardContainer size="large" color="primary">
      <i className="fa fa-plus"></i>
    </PlusGerenicCardContainer>
  );
};
export default PlusGerenicCard;
