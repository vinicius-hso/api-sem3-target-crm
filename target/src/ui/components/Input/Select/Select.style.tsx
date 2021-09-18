import { Select } from "@material-ui/core";
import { experimentalStyled as styled } from "@material-ui/core/styles";

export const InputContainer = styled("div")`
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  justify-content: center;
`;

export const SelectStyled = styled(Select)`
  color: ${({ theme }) => theme.palette.grey[400]};
  margin: ${({ theme }) => theme.spacing(1)} 0;
  margin-right: 8px;
`;
