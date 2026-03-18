import React, { JSX, StrictMode, useEffect, useState } from "react";
import Props from "react";
import AppRouter from "~/AppRouter";
import AppRoutes from "~/AppRoutes";
import LBRY from "~/LBRY";
import Aside from "~/components/Aside";
import Header from "~/components/Header";
import ServersPage from "~/pages/ServersPage";

function App({ url }: Props & { url?: string }): JSX.Element {
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);
  const [isMenuShown] = useState<boolean>(true);

  const [hasDaemonRPC, setHasDaemonRPC] = useState<boolean>(false);

  window.addEventListener("storage", (): void => {
    setHasDaemonRPC(LBRY.getDaemonRPC() !== null);
  });

  useEffect((): void => {
    LBRY.setDaemonRPC(LBRY.getDaemonRPC());
  }, []);

  return (
    <StrictMode>
      <AppRouter url={url}>
        {hasDaemonRPC ? (
          <>
            <Header menuOpen={isMenuOpen} menuOpenSetter={setMenuOpen} />
            {isMenuShown ? <Aside open={isMenuOpen} /> : null}
            <main className="has-header">
              <AppRoutes />
            </main>
          </>
        ) : (
          <main>
            <ServersPage />
          </main>
        )}
      </AppRouter>
    </StrictMode>
  );
}

export default App;
