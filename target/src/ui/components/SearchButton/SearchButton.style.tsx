import { experimentalStyled as styled } from "@material-ui/core/styles";
import {
  Divider,
  IconButton,
  InputBase,
  Paper,
  Select,
} from "@material-ui/core";

export const PaperStyled = styled(Paper)`
  position: relative;
  padding: 2px 4px;
  display: flex;
  align-items: center;
  height: 40px;
  margin: auto 0;
  margin-left: auto;
  width: 100%;
  background-color: ${({ theme }) => theme.palette.grey[100]}
    ${({ theme }) => theme.breakpoints.up("md")} {
    width: 400px;
  }
  ${({ theme }) => theme.breakpoints.down("md")} {
    margin-top: 20px;
  }
`;

export const InputBaseStyled = styled(InputBase)`
  margin-left: theme.spacing(1);
  flex: 1;
  max-height: 50px;
  height: 50px;
`;

export const DividerStyled = styled(Divider)`
  height: 28;
  margin: 4;
`;

export const IconButtonStyled = styled(IconButton)`
  padding: 10;
`;
