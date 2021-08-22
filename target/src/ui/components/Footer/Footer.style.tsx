import { Container } from "@material-ui/core";
import { experimentalStyled as styled } from "@material-ui/core/styles";

export const FooterStyled = styled("footer")`
  margin-top: auto;
  background-color: ${({ theme }) => theme.palette.primary.main};
  color: ${({ theme }) =>
    theme.palette.getContrastText(theme.palette.primary.main)};
  padding: ${({ theme }) => theme.spacing(2)} 0;
`;

export const FooterContainer = styled(Container)``;
