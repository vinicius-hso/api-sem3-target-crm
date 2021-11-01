import { experimentalStyled as styled } from "@material-ui/core/styles";
import { Dialog } from "@material-ui/core";

export const DialogStyled = styled(Dialog)`
  //width: 80%;
  //max-width: 1000px;
`;

export const DialogIconContainer = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing(2)};
  font-size: 60px;
  color: ${({ theme }) => theme.palette.primary.main};
`;

export const IconStyled = styled("i")`
  border: 4px solid ${({ theme }) => theme.palette.primary.main};
  padding: 0 ${({ theme }) => theme.spacing(1.7)};
  border-radius: 100%;
  aspect-ratio: 1;
`;
