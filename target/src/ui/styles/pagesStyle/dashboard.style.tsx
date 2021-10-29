import { experimentalStyled as styled } from "@material-ui/core/styles";

export const DatePickerContainer = styled("div")`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: ${({ theme }) => theme.spacing(2)};
  overflow: hidden;
  ${({ theme }) => theme.breakpoints.down("md")} {
    width: 100vw;
  }
`;
