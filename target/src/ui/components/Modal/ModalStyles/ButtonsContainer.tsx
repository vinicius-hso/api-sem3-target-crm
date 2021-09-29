import React from "react";
import { experimentalStyled as styled } from "@material-ui/core/styles";

export const ButtonsContainer = styled("div")`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing(0.2) + " " + theme.spacing(3)};
  ${({ theme }) => theme.breakpoints.up("md")} {
    flex-wrap: wrap-reverse;
    flex-direction: row-reverse;
  }
`;
