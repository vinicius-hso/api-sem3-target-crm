import { Skeleton } from "@material-ui/core";
import React from "react";
import { BodyContainer, StackStyled } from "./Validation.style";

export interface LinkComponentProps {
  href: string;
  text?: string;
  query?: {};
  textColor?: string;
}

const Validation: React.FC = () => {
  return (
    <StackStyled spacing={1}>
      <Skeleton variant="rectangular" width={1460} height={100} />
      <Skeleton variant="rectangular" width={100} height={550} />

      <BodyContainer>
        <Skeleton variant="rectangular" width={1310} height={40} />
        <br />
        <Skeleton variant="rectangular" width={1310} height={40} />
        <br />
        <div>
          <Skeleton variant="rectangular" width={250} height={325} />
          <Skeleton variant="rectangular" width={250} height={325} />
          <Skeleton variant="rectangular" width={250} height={325} />
          <Skeleton variant="rectangular" width={250} height={325} />
          <Skeleton variant="rectangular" width={250} height={325} />
        </div>
      </BodyContainer>
    </StackStyled>
  );
};

export default Validation;
