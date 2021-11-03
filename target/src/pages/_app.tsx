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
    <>
      <Head>
        {/* DEFINE LINK DA FONTE POPPINS E FONTE DE ICONES  */}
        <title>TARGET</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link rel="icon" href="favicon.svg" sizes="any" type="image/svg+xml" />
        <meta name="theme-color" content="#E2711D" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
        />
      </Head>
      {/* THEMEPROVIDER DEIXA O TEMA DA APLICAÇÃO DISPONIVEL EM TODOS ELEMENTOS FILHOS NESSE CASO TODAS AS PAGINAS */}
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
    </>
  );
}

export default MyApp;
