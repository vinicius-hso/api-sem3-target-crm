import { Avatar, Button, Container } from "@material-ui/core";
import { experimentalStyled as styled } from "@material-ui/core/styles";

export const UserAccountCardContainer = styled("div")`
  max-width: 90vw;
  display: flex;
  flex-direction: column;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.palette.grey[50]};
  padding: ${({ theme }) => theme.spacing(2)};
  gap: ${({ theme }) => theme.spacing(0.2) + " " + theme.spacing(2)};
  border-radius: 8px;
  box-shadow: 4px 4px rgba(0, 0, 0, 0.05);
  position: relative;
  overflow: auto;
  top: 20px;

  ${({ theme }) => theme.breakpoints.down("md")} {
    grid-template-columns: 1fr;
  }
`;

export const EditButton = styled(Button)`
  position: absolute;
  top: 0;
  right: 0;
`;

export const InputContainer = styled("div")`
  overflow: hidden;
  width: 100%;
`;

export const ContainerStyled = styled(Container)`
  margin-top: 50px;
  padding-bottom: 20px;

  div {
    &.containerTitle {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
`;
