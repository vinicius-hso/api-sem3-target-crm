import { experimentalStyled as styled } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";

export const TextFieldStyled = styled(TextField)`
  margin: ${({ theme }) => theme.spacing(1)} 0;
  min-width: 290px;

  .MuiInputBase-root {
    background-color: ${({ theme }) => theme.palette.primary[50]};
  }

  .MuiStandardInput-notchedStandard {
    border-color: ${({ theme }) => theme.palette.primary[100]};
  }
`;
