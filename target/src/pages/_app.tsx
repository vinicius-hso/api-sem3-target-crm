import React, { useContext, useMemo } from "react";
import "@styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import { ThemeProvider } from "@material-ui/core/";
import theme from "ui/theme/theme";
import NavBar from "ui/components/NavBar/NavBar";
import { AppContainer } from "ui/styles/pagesStyle/_app.syile";
import AuthContext, { AuthProvider } from "contexts/AuthContext";
import { ModalProvider } from "contexts/PipelineContext";
import { useRouter } from "next/dist/client/router";
import { ContactProvider } from "contexts/ContactContext";
import { CompanyProvider } from "contexts/CompanyContext";
import { ToastContainer } from "react-toastify";
import { useNavBarComponent } from "data/services/hooks/componentHooks/NavBarHook";
import Validation from "ui/components/Validation/Validation";

function MyApp({ Component, pageProps }) {
  moment.locale("pt-br");
  const currentRoute = useRouter();
  const { tokenValidated } = useNavBarComponent();

  const validatedUser = useMemo(() => {
    if (tokenValidated) {
      return true;
    } else if (currentRoute.query.loged) {
      currentRoute.push("/");
      setTimeout(() => {
        window.location.reload();
      }, 200);
      return true;
    } else {
      return false;
    }
  }, [tokenValidated, currentRoute]);

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        {currentRoute.route === "/login" ||
        currentRoute.route === "/recover_pass" ||
        currentRoute.route === "/welcome" ||
        currentRoute.route === "/recover" ? (
          <>
            <Component {...pageProps}></Component>
          </>
        ) : (
          <ModalProvider>
            <ContactProvider>
              <CompanyProvider>
                <AppContainer>
                  {validatedUser ? (
                    <ToastContainer autoClose={3000} />
                  ) : (
                    <Validation />
                  )}
                  <NavBar
                    CurrentPage={<Component {...pageProps}></Component>}
                    style={{
                      maxHeight: "1000px",
                      display: validatedUser ? "" : "none",
                    }}
                  />
                </AppContainer>
              </CompanyProvider>
            </ContactProvider>
          </ModalProvider>
        )}
      </AuthProvider>
    </ThemeProvider>
  );
}

export default MyApp;
