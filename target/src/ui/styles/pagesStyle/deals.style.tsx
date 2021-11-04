import { experimentalStyled as styled } from "@material-ui/core/styles";

export const DealsPageContainer = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  ${({ theme }) => theme.breakpoints.down("md")} {
    width: 100vw;
  }
`;

export const DealsHeaderContainer = styled("div")`
  display: grid;
  width: 90%;
  padding: ${({ theme }) => theme.spacing(4)} 0;

  ${({ theme }) => theme.breakpoints.up("md")} {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const TitleHeaderContainer = styled("div")`
  ${({ theme }) => theme.breakpoints.up("md")} {
    margin-right: auto;
  }
`;

export const DealsTotalTagsContainer = styled("div")`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 160px;
  margin: 0 auto;
  gap: 8px;
  color: ${({ theme }) => theme.palette.text.primary};
`;

export const PipelinesContainer = styled("div")`
  padding: ${({ theme }) => theme.spacing(2)};
  width: 95%;
  margin: auto 0;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.palette.grey[100]};
`;
