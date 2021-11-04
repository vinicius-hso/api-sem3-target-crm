import { experimentalStyled as styled } from "@material-ui/core/styles";

export const TitleContainer = styled("div")`
  text-align: center;
  margin: ${({ theme }) => theme.spacing(1)} 0;
  white-space: nowrap;
`;

export const TitleStyled = styled("h2")`
  margin: 0;
  color: ${({ theme }) => theme.palette.primary.main};
  font-size: ${({ theme }) => theme.typography.h6.fontSize};
  font-weight: bold;
  text-overflow: ellipsis;
  overflow: hidden;

  ${({ theme }) => theme.breakpoints.down("md")} {
    font-size: ${({ theme }) => theme.typography.body1.fontSize};
  }
`;

export const SubtitleStyled = styled("h3")`
  margin: ${({ theme }) => theme.spacing(1.5)} 0;
  color: ${({ theme }) => theme.palette.text.primary};
  font-size: ${({ theme }) => theme.typography.body1.fontSize};
  font-weight: normal;

  ${({ theme }) => theme.breakpoints.down("md")} {
    font-size: ${({ theme }) => theme.typography.body2.fontSize};
  }
`;
