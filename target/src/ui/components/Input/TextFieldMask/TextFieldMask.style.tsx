import { experimentalStyled as styled } from "@material-ui/core/styles";

export const InputContainer = styled('div')`
  display: grid;
  grid-template-columns: 40px 1fr;
  align-items: center;
  justify-content: center;
`;

export const InputIconStyled = styled('i')`
  text-align: center;
  color: ${({ theme }) => theme.palette.grey[400]};
`;
