import { experimentalStyled as styled } from "@material-ui/core/styles";
import { Link } from "@material-ui/core";

export const LinkStyled = styled(Link)`
  text-decoration: none;
  display: flex;
  align-items: center;
  position: relative;
`;

export const RecoveryPassLink = styled("a")`
  text-decoration: none;
  color: ${({ theme }) => theme.palette.grey[100]};
  transition: color 0.4s;

  &:hover {
    color: ${({ theme }) => theme.palette.primary.main};
  }
`;
