import { experimentalStyled as styled } from "@material-ui/core/styles";

export const CompanyPageContainer = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${({ theme }) => theme.spacing(2)};
  overflow: hidden;
  width: calc(100vw - 178px);
  background-color: ${({ theme }) => theme.palette.primary.main}
    ${({ theme }) => theme.breakpoints.down("md")} {
    width: calc(100vw);
  }
`;

export const CompanyHeaderContainer = styled("div")`
  display: grid;
  width: 90%;
  padding: ${({ theme }) => theme.spacing(4)} 0;
  justify-content: space-between;
  align-items: center;

  ${({ theme }) => theme.breakpoints.up("md")} {
    grid-template-columns: repeat(2, 1fr);
  }
`;
