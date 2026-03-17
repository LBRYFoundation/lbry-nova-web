import React, { JSX, StrictMode, useState } from "react";
import Props from "react";
import AppRouter from "~/AppRouter";
import AppRoutes from "~/AppRoutes";
import Aside from "~/components/Aside";
import Header from "~/components/Header";
import ServersPage from "~/pages/ServersPage";

function App({ url }: Props & { url?: string }): JSX.Element {
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);
  const [isMenuShown] = useState<boolean>(true);

  return (
    <StrictMode>
      <AppRouter url={url}>
        {isRPCServerSelected() ? (
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

function isRPCServerSelected(): boolean {
  return false;
}

export default App;
