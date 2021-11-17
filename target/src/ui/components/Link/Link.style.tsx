import { experimentalStyled as styled } from "@material-ui/core/styles";
import StaticLink from "./LinkNext";

export const LinkStyled = styled(StaticLink)`
  display: flex;
  text-decoration: none;
  position: relative;
  .linkMUI {
    text-decoration: none;
    display: flex;
    align-items: center;
    position: relative;
  }
`;

export const RecoveryPassLink = styled("a")`
  text-decoration: none;
  color: ${({ theme }) => theme.palette.grey[100]};
  transition: color 0.4s;

  &:hover {
    color: ${({ theme }) => theme.palette.primary.main};
  }
`;
