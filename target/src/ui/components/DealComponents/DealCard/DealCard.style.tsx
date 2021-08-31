import { Avatar, Card } from "@material-ui/core";
import { experimentalStyled as styled } from "@material-ui/core/styles";

export const DealCardContainer = styled(Card)`
  display: grid;
  grid-template-columns: 28px 1fr 15px;
  width: 100%;
  max-width: 250px;
  padding: ${({ theme }) => theme.spacing(1)};
  gap: ${({ theme }) => theme.spacing(0.2) + " " + theme.spacing(1.5)};
  margin: ${({ theme }) => theme.spacing(1)} 0
`;

export const DealPictureStyled = styled(Avatar)`
  width: 20px;
  height: initial;
  aspect-ratio: 1;
  font-family: "Arial Narrow", Arial, sans-serif;
`;

export const DealDescriptionContainer = styled("div")`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(0.5)};
`;

export const DealTitleStyled = styled("div")`
  color: ${({ theme }) => theme.palette.text.primary};
  font-size: ${({ theme }) => theme.typography.body2.fontSize};
  font-weight: 600;
`;

export const DealBudgetStyled = styled("div")`
  font-size: 12px;
  color: ${({ theme }) => theme.palette.text.secondary};
`;

export const DealFooterContainer = styled("div")`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

export const DealTypeStyled = styled("div")`
  font-size: ${({ theme }) => theme.typography.body2.fontSize};
`;

export const DealStartDateStyled = styled("div")`
  text-align: center;
  color: ${({ theme }) => theme.palette.text.secondary};
  font-size: 12px;
`;
