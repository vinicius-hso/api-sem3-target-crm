import React, { useMemo } from "react";
import "@styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import { ThemeProvider } from "@material-ui/core/";
import theme from "ui/theme/theme";
import NavBar from "ui/components/NavBar/NavBar";
import { AppContainer } from "ui/styles/pagesStyle/_app.syile";
import { AuthProvider } from "contexts/AuthContext";
import { ModalProvider } from "contexts/PipelineContext";
import { useRouter } from "next/dist/client/router";
import { ContactProvider } from "contexts/ContactContext";
import { CompanyProvider } from "contexts/CompanyContext";
import { ToastContainer } from "react-toastify";
import { CookiesProvider } from "react-cookie";

function MyApp({ Component, pageProps }) {
  moment.locale("pt-br");
  const currentRoute = useRouter();

  return (
    <ThemeProvider theme={theme}>
      <CookiesProvider>
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
                    <ToastContainer autoClose={3000} />
                    <NavBar
                      CurrentPage={<Component {...pageProps}></Component>}
                      style={{
                        maxHeight: "1000px",
                      }}
                    />
                  </AppContainer>
                </CompanyProvider>
              </ContactProvider>
            </ModalProvider>
          )}
        </AuthProvider>
      </CookiesProvider>
    </ThemeProvider>
  );
}

export default MyApp;
