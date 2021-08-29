import { experimentalStyled as styled } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";

export const TextFieldStyled = styled(TextField)`
  margin: ${({ theme }) => theme.spacing(1)} 0;
  min-width: 265px;

  .MuiInputBase-root {
    background-color: ${({ theme }) => theme.palette.grey[50]};
  }

  .MuiOutlinedInput-notchedOutline {
    border-color: ${({ theme }) => theme.palette.grey[100]};
  }
`;
