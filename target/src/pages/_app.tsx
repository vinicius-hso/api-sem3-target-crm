import React from "react";
import "@styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import { ThemeProvider } from "@material-ui/core/";
import theme from "ui/theme/theme";
import Head from "next/head";
import NavBar from "ui/components/NavBar/NavBar";
import { AppContainer } from "ui/styles/pagesStyle/_app.syile";
import { AuthProvider } from "contexts/AuthContext";
import { ModalProvider } from "contexts/PipelineContext";
import { useRouter } from "next/dist/client/router";
import { ContactProvider } from "contexts/ContactContext";
import { CompanyProvider } from "contexts/CompanyContext";
import { ToastContainer } from "react-toastify";

function MyApp({ Component, pageProps }) {
  moment.locale("pt-br");
  const currentRoute = useRouter();
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
                  <ToastContainer autoClose={3000} />
                  <NavBar
                    CurrentPage={<Component {...pageProps}></Component>}
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
