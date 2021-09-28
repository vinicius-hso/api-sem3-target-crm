import { Avatar, Rating } from "@material-ui/core";
import { experimentalStyled as styled } from "@material-ui/core/styles";

//@deprecated
export const ContactCardContainer = styled("div")`
  display: grid;
  width: 100%;
  grid-template-columns: 60px 1fr;
  grid-template-rows: repeat(3, auto);
  grid-template-areas:
    "picture name"
    "picture company"
    "picture phone"
    "picture city";
  background-color: ${({ theme }) => theme.palette.background.paper};
  padding: ${({ theme }) => theme.spacing(2)};
  align-items: center;
  gap: ${({ theme }) => theme.spacing(0.2) + " " + theme.spacing(2)};
  margin: 0 auto;
  border-radius: 8px;
  box-shadow: 4px 4px rgba(0, 0, 0, 0.05);

  ${({ theme }) => theme.breakpoints.up("md")} {
    display: grid;
    width: 100%;
    grid-template-columns: 60px repeat(4, 1fr);
    grid-template-rows: repeat(2, auto);
    grid-template-areas: "picture name phone company city";
  }
`;

export const ContactNameStyled = styled("div")`
  color: ${({ theme }) => theme.palette.text.primary};
  font-size: ${({ theme }) => theme.typography.body2.fontSize};
  font-weight: bold;
  grid-area: name;
`;

export const ContactCityStyled = styled("div")`
  color: ${({ theme }) => theme.palette.text.secondary};
  font-size: ${({ theme }) => theme.typography.body2.fontSize};
  grid-area: city;
`;

export const ContactPictureStyled = styled(Avatar)`
  grid-area: picture;
  width: 100%;
  height: initial;
  aspect-ratio: 1;
  font-size: 16px;
`;

export const ContactPhoneStyled = styled("div")`
  color: ${({ theme }) => theme.palette.text.secondary};
  font-size: ${({ theme }) => theme.typography.body2.fontSize};
  grid-area: phone;
`;

export const ContactCompanyStyled = styled("div")`
  color: ${({ theme }) => theme.palette.text.secondary};
  font-size: ${({ theme }) => theme.typography.body2.fontSize};
  grid-area: company;
`;
