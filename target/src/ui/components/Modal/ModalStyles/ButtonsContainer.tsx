import React from "react";
import { experimentalStyled as styled } from "@material-ui/core/styles";

export const ButtonsContainer = styled("div")`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(0.2) + " " + theme.spacing(2)};

  ${({ theme }) => theme.breakpoints.down("md")} {
    align-items: center;
  }

  ${({ theme }) => theme.breakpoints.up("md")} {
    flex-wrap: wrap-reverse;
    flex-direction: row;
    flex-direction: row-reverse;
  }
`;
