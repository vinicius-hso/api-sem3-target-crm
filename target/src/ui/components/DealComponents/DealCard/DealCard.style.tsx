import { Avatar, Card } from "@material-ui/core";
import { experimentalStyled as styled } from "@material-ui/core/styles";

export const DealCardContainer = styled(Card)`
  display: grid;
  grid-template-columns: 28px 1fr 15px;
  width: 100%;
  padding: ${({ theme }) => theme.spacing(1)};
  gap: ${({ theme }) => theme.spacing(0.2) + " " + theme.spacing(0.5)};
  margin: ${({ theme }) => theme.spacing(1)} 0;
  box-shadow: 4px 4px rgba(0, 0, 0, 0.05);
`;

export const DealPictureStyled = styled(Avatar)`
  width: 20px;
  height: initial;
  aspect-ratio: 1;
  font-size: 16px;
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

export const ColumnContainer = styled("div")`
  min-height: 450px;
  display: grid;
  grid-template-columns: 300px;
  grid-template-rows: 100px 1fr;
  background-color: ${({ theme }) => theme.palette.background.paper};
  border-radius: 6px;
  box-shadow: 6px 8px rgba(175, 170, 170, 0.08);
  padding: ${({ theme }) => theme.spacing(1)};
`;

export const ColumnHeader = styled("div")`
  text-transform: uppercase;
  margin-bottom: 20px;
`;

export const DroppableStyles = styled("div")`
  margin-top: 20px;
  padding: 10px;
  border-radius: 6px;
  background: ${({ theme }) => theme.palette.grey[100]};
`;

export const TitleColumnContainer = styled("div")`
  padding: 10px;
  border-radius: 6px;
  background: #d4d4d4;
`;

export const ListGrid = styled("div")`
  display: flex;
  max-width: calc(100vw - 120px);
  gap: ${({ theme }) => theme.spacing(4)};
  overflow: auto;

  ${({ theme }) => theme.breakpoints.down("md")} {
    max-width: calc(100%);
  }
`;
