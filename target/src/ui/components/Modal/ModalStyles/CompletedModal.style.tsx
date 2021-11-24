import { Modal } from "@material-ui/core";
import { experimentalStyled as styled } from "@material-ui/core/styles";

export const CompletedeModalStyled = styled(Modal)`
  background-color: rgb(107, 105, 105, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const InfoContainer = styled("div")`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: auto;
  flex-direction: line;
  margin: 10px;

  ${({ theme }) => theme.breakpoints.down("sm")} {
    /* display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    height: auto;
    flex-direction: row;
    */
    flex-wrap: wrap;
  }
`;
