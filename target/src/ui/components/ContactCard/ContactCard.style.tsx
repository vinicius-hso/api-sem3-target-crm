import { experimentalStyled as styled } from "@material-ui/core/styles";

export const TitleContainer = styled("div")`
  text-align: center;
  margin: ${({ theme }) => theme.spacing(5)} 0;
`;

export const TitleStyle = styled("h2")`
  margin: 0;
  color: ${({ theme }) => theme.palette.primary.main};
  font-size: ${({ theme }) => theme.typography.h6.fontSize};
  font-weight: bold;

  ${({ theme }) => theme.breakpoints.down("md")} {
    font-size: ${({ theme }) => theme.typography.body1.fontSize};
  }
`;
