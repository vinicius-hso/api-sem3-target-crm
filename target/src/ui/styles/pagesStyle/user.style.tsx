import { experimentalStyled as styled } from "@material-ui/core/styles";

export const UserPageContainer = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${({ theme }) => theme.spacing(2)};
  overflow: hidden;
  ${({ theme }) => theme.breakpoints.down("md")} {
    width: 100vw;
  }
`;

export const UserHeaderContainer = styled("div")`
  display: grid;
  width: 90%;
  padding-top: ${({ theme }) => theme.spacing(4)};
  justify-content: space-between;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  ${({ theme }) => theme.breakpoints.up("md")} {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const NewUserButtonContainer = styled("div")`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: right;
  margin: ${({ theme }) => theme.spacing(4)} 0
    ${({ theme }) => theme.spacing(1)} 0;

  ${({ theme }) => theme.breakpoints.up("md")} {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const CardsContainer = styled("div")`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
  width: 100%;
  background-color: ${({ theme }) => theme.palette.grey[100]};
  padding: ${({ theme }) => theme.spacing(2)};
  border-radius: 8px;
`;

export const TitleContainer = styled("div")`
  ${({ theme }) => theme.breakpoints.up("md")} {
    margin-right: auto;
  }
`;
