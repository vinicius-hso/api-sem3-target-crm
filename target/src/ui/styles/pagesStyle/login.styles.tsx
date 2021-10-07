import { experimentalStyled as styled } from "@material-ui/core/styles";

export const FormContainer = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2;
  max-width: 850px;
  margin: auto 0;
`;

export const LoginContainer = styled("div")`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  hr {
    margin: 60px auto;
    border-top: 0.5px solid #c4c4c4;
    width: 75%;
  }
`;
