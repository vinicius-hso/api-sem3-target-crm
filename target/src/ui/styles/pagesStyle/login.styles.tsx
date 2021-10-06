import { experimentalStyled as styled } from "@material-ui/core/styles";

export const FormContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2;
  max-width: 850px;
  margin: auto 0;
  
`;

export const LoginContainer = styled('div')`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 100vw;
  height: 100vh; 
  hr {
  margin: 60px 0;
  border: 0;
  border-top: 2px solid #C4C4C4;
  width: 80%;
  text-align: center;
  
}
`;
