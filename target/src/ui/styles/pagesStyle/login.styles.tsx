import { experimentalStyled as styled } from "@material-ui/core/styles";

export const FormContainer = styled("form")`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2;
  max-width: 850px;
  margin: auto 0;
  ${({ theme }) => theme.breakpoints.down("md")} {
    margin: 0;
  }
`;

export const LoginContainer = styled("div")`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  height: 100vh;
  hr {
    margin: 60px auto;
    border-top: 0.5px solid #c4c4c4;
    width: 75%;
  }
  ${({ theme }) => theme.breakpoints.down("md")} {
    grid-template-columns: 0 1fr;
    overflow-y: hidden;
  }
`;

export const LoginRightContainer = styled("div")`
  margin: auto 0;
  height: 100vh;
  background-color: #2d3142;

  ${({ theme }) => theme.breakpoints.down("md")} {
    margin: 0;
    height: auto;
  }
`;
