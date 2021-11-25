import { Box } from "@material-ui/core";
import { experimentalStyled as styled } from "@material-ui/core/styles";

export const DashboardPageContainer = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
  ${({ theme }) => theme.breakpoints.down("md")} {
    width: 100vw;
  }
`;

export const DashboardHeaderContainer = styled("div")`
  display: grid;
  width: 90%;
  padding-top: ${({ theme }) => theme.spacing(4)};
  justify-content: space-between;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  ${({ theme }) => theme.breakpoints.up("md")} {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const DatePickerContainer = styled("div")`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: ${({ theme }) => theme.spacing(2)};
  overflow: hidden;

  gap: ${({ theme }) => theme.spacing(2)};
  flex-direction: column;

  .buttonEditChart {
    display: flex;
    gap: ${({ theme }) => theme.spacing(2)};

    ${({ theme }) => theme.breakpoints.down("md")} {
      flex-direction: column;
    }
  }

  .inputDateGroup {
    display: flex;
    gap: ${({ theme }) => theme.spacing(2)};
    align-items: center;

    ${({ theme }) => theme.breakpoints.down("md")} {
      flex-direction: column;
    }
  }
`;

export const ChartsContainer = styled("div")`
  padding: ${({ theme }) => theme.spacing(2) + " " + theme.spacing(8)};
  width: 100%;
  min-width: 720px;
  ${({ theme }) => theme.breakpoints.down("sm")} {
    min-width: 400px;
  }
`;

export const BoxStyled = styled(Box)`
  display: flex;
  justify-content: center;
  gap: 5;
  margin: ${({ theme }) => theme.spacing(3)};

  ${({ theme }) => theme.breakpoints.down("md")} {
    flex-direction: column;
  }
`;
