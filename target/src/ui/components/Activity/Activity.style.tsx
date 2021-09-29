import { experimentalStyled as styled } from "@material-ui/core/styles";

export const ActivityContainer = styled("div")`
  max-width: 90vw;
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.palette.grey[50]};
  padding: ${({ theme }) => theme.spacing(2)};
  margin: ${({ theme }) => theme.spacing(2)} 0;
  gap: ${({ theme }) => theme.spacing(0.2) + " " + theme.spacing(2)};
  border-radius: 8px;
  box-shadow: 4px 4px rgba(0, 0, 0, 0.05);
  position: relative;
`;

export const ActivityTimeContainer = styled("div")`
  display: grid;
  grid-template-columns: 1fr 80px 80px;
  gap: ${({ theme }) => theme.spacing(0.2) + " " + theme.spacing(2)};
  max-width: 300px;
`;
