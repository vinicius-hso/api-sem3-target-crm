import { Avatar, Rating } from "@material-ui/core";
import { experimentalStyled as styled } from "@material-ui/core/styles";

export const ContactCardContainer = styled("div")`
  display: grid;
  grid-template-columns: 60px 1fr;
  grid-template-rows: repeat(3, auto);
  grid-template-areas:
    "picture name"
    "picture rating"
    "picture description";
  background-color: ${({ theme }) => theme.palette.grey[50]};
  padding: ${({ theme }) => theme.spacing(2)};
  align-items: center;
  gap: ${({ theme }) => theme.spacing(0.2) + " " + theme.spacing(2)};
`;

export const ContactNameStyled = styled("div")`
  color: ${({ theme }) => theme.palette.text.primary};
  font-size: ${({ theme }) => theme.typography.body2.fontSize};
  font-weight: bold;
  grid-area: name;
`;

export const ContactDescriptionStyled = styled("div")`
  color: ${({ theme }) => theme.palette.text.secondary};
  font-size: ${({ theme }) => theme.typography.body2.fontSize};
  grid-area: description;
`;

export const ContactAvatarStyled = styled(Avatar)`
  grid-area: picture;
  width: 100%;
  height: initial;
  aspect-ratio: 1;
  font-family: "Arial Narrow", Arial, sans-serif;
`;

export const ContactRatingStyled = styled(Rating)`
  font-size: 14px;
  grid-area: rating;
`;
