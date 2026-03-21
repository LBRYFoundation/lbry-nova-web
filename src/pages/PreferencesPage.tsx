import React, { JSX, useEffect, useState } from "react";
import LBRY from "~/LBRY";
import Error from "~/components/Error";
import Loader from "~/components/Loader";

function PreferencesPage(): JSX.Element {
  const [preferencesResponse, setPreferencesResponse] = useState<
    object | undefined
  >(undefined);

  useEffect((): void => {
    LBRY.rpc(
      LBRY.getDaemonRPC(),
      LBRY.PREFERENCE_GET,
      undefined,
      undefined,
      LBRY.isUsingProxy(),
    ).then((json: object): void => {
      setPreferencesResponse(json);
    });
  }, []);

  return (
    <>
      <h1>Preferences</h1>
      {preferencesResponse ? (
        preferencesResponse.error ? (
          <Error message={preferencesResponse.error.message} />
        ) : (
          <div id="preferences" style={{ padding: "16px 0" }}>
            {JSON.stringify(preferencesResponse)}
          </div>
        )
      ) : (
        <Loader />
      )}
    </>
  );
}

export default PreferencesPage;
