import "../styles/globals.css";
import { useRouter } from "next/router";
import Nprogress from "nprogress";
import "../styles/nprogress.css";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  const Router = useRouter();

  useEffect(() => {
    Router.events.on("routeChangeStart", () => {
      Nprogress.start();
    });
    Router.events.on("routeChangeComplete", () => {
      Nprogress.done();
    });
    Router.events.on("routeChangeError", () => {
      Nprogress.done();
    });
    return () => {
      Router.events.off("routeChangeStart", () => {
        Nprogress.start();
      });
      Router.events.off("routeChangeComplete", () => {
        Nprogress.done();
      });
      Router.events.off("routeChangeError", () => {
        Nprogress.done();
      });
    };
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
