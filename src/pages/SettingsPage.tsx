import React, { JSX, useEffect, useState } from "react";
import LBRY from "~/LBRY";
import Error from "~/components/Error";
import Loader from "~/components/Loader";

function SettingsPage(): JSX.Element {
  const [settingsResponse, setSettingsResponse] = useState<object>(undefined);

  useEffect((): void => {
    LBRY.rpc(
      LBRY.getDaemonRPC(),
      LBRY.SETTINGS_GET,
      undefined,
      undefined,
      LBRY.isUsingProxy(),
    ).then((json: object): void => {
      setSettingsResponse(json);
    });
  }, []);

  return (
    <>
      <h1>Settings</h1>
      {settingsResponse ? (
        settingsResponse.error ? (
          <Error message={settingsResponse.error.message} />
        ) : (
          <div id="settings" style={{ padding: "16px 0" }}>
            {Object.keys(settingsResponse.result).map(
              (setting: string, i: number): JSX.Element => (
                <div
                  key={i}
                  style={{
                    border: "1px solid red",
                    margin: "8px 0",
                    padding: "16px",
                  }}
                >
                  <b>{setting}</b>
                  <br />
                  <span>
                    {JSON.stringify(settingsResponse.result[setting])}
                  </span>
                </div>
              ),
            )}
          </div>
        )
      ) : (
        <Loader />
      )}
    </>
  );
}

export default SettingsPage;
