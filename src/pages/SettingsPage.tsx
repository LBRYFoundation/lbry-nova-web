import React, { JSX, useEffect, useState } from "react";
import LBRY from "~/LBRY";
import Error from "~/components/Error";
import Loader from "~/components/Loader";

function SettingsPage(): JSX.Element {
  const [settingsResponse, setSettingsResponse] = useState<object | undefined>(
    undefined,
  );

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
            <h2 style={{ padding: 6 }}>Appearance</h2>
            <div
              style={{
                background: "#0000007F",
                borderRadius: 10,
                margin: 8,
                padding: 10,
              }}
            >
              <b>Language</b>
              <br />
              <span>
                Multi-language support is brand new and incomplete. Switching
                your language may have unintended consequences, like
                glossolalia.
              </span>
              <br />
              <br />
              <select>
                <option value="en">English</option>
              </select>
              <hr />
              <b>Search only in the selected language by default</b>
              <br />
              <br />
              <input type="checkbox" />
            </div>
            <h2 style={{ padding: 6 }}>Account</h2>
            <div
              style={{
                background: "#0000007F",
                borderRadius: 10,
                margin: 8,
                padding: 10,
              }}
            >
              TODO
            </div>
            <h2 style={{ padding: 6 }}>Content settings</h2>
            <div
              style={{
                background: "#0000007F",
                borderRadius: 10,
                margin: 8,
                padding: 10,
              }}
            >
              TODO
            </div>
            <h2 style={{ padding: 6 }}>System</h2>
            <div
              style={{
                background: "#0000007F",
                borderRadius: 10,
                margin: 8,
                padding: 10,
              }}
            >
              TODO
            </div>
            <h2 style={{ padding: 6 }}>Content hosting</h2>
            <div
              style={{
                background: "#0000007F",
                borderRadius: 10,
                margin: 8,
                padding: 10,
              }}
            >
              <b>Enable Data Hosting</b>
              <br />
              <span>
                Help improve the P2P data network (and make LBRY users happy) by
                hosting data.
              </span>
              <div
                style={{
                  background:
                    "linear-gradient(to right," +
                    getCSSLinearGradientStorage(100, 0, 0, 0) +
                    ")",
                  borderRadius: 10,
                  height: 48,
                  margin: 15,
                  maxWidth: "100%",
                  width: 640,
                }}
              ></div>
              <hr />
              <b>Viewed Hosting</b>
              <br />
              <span>
                View History Hosting lets you choose how much storage to use
                hosting content you've consumed.
              </span>
              <hr />
              <b>Auto Hosting</b>
              <br />
              <span>
                Automatic Hosting downloads a small portion of content active on
                the network.
              </span>
            </div>
            <h2 style={{ padding: 6 }}>Other</h2>
            <div
              style={{
                background: "#0000007F",
                borderRadius: 10,
                margin: 8,
                padding: 10,
              }}
            >
              {Object.keys(settingsResponse.result).map(
                (setting: string, i: number): JSX.Element => (
                  <div
                    key={i}
                    style={{
                      margin: "8px 0",
                    }}
                  >
                    <b>{setting}</b>
                    <br />
                    <textarea
                      readOnly={true}
                      style={{ height: 50, margin: 8, width: 300 }}
                    >
                      {JSON.stringify(settingsResponse.result[setting])}
                    </textarea>
                    <hr />
                  </div>
                ),
              )}
            </div>
          </div>
        )
      ) : (
        <Loader />
      )}
    </>
  );
}

function getCSSLinearGradientStorage(
  other: number,
  published: number,
  auto: number,
  viewed: number,
): string {
  return [
    "#3f3f46 " + "0" + "% " + other + "%",
    "#36adba " + other + "% " + (other + published) + "%",
    "#ff993c " + (other + published) + "% " + (other + published + auto) + "%",
    "#a93cff " +
      (other + published + auto) +
      "% " +
      (other + published + auto + viewed) +
      "%",
  ].join(",");
}

export default SettingsPage;
