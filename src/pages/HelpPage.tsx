import packageJSON from "/package.json";
import React, { JSX, useEffect, useState } from "react";
import { Link } from "react-router";
import LBRY from "~/LBRY";
import CustomSVG from "~/components/CustomSVG";
import Error from "~/components/Error";
import Loader from "~/components/Loader";

function HelpPage(): JSX.Element {
  const [statusResponse, setStatusResponse] = useState<object | undefined>(
    undefined,
  );
  const [versionResponse, setVersionResponse] = useState<object | undefined>(
    undefined,
  );

  useEffect((): void => {
    LBRY.rpc(
      LBRY.getDaemonRPC(),
      LBRY.STATUS,
      undefined,
      undefined,
      LBRY.isUsingProxy(),
    ).then((json: object): void => {
      setStatusResponse(json);
    });
  }, []);

  useEffect((): void => {
    LBRY.rpc(
      LBRY.getDaemonRPC(),
      LBRY.VERSION,
      undefined,
      undefined,
      LBRY.isUsingProxy(),
    ).then((json: object): void => {
      setVersionResponse(json);
    });
  }, []);

  return (
    <>
      <h1>Help</h1>
      <div style={{ padding: "16px 0" }}></div>
      <h2>Read the FAQ</h2>
      <div style={{ padding: "16px 0" }}>
        <p>Our FAQ answers many common questions.</p>
        <Link style={{ margin: "0 8px" }} to="https://lbry.org/faq/lbry-basics">
          <button
            style={{
              backgroundColor: "rgba(17, 17, 17, 0.4)",
              // backgroundColorHover: 'rgba(17, 17, 17, 0.7)',
              border: "none",
              borderRadius: "6px",
              color: "white",
              cursor: "pointer",
              fontWeight: "700",
              height: "40px",
              padding: "0 16px",
            }}
          >
            <CustomSVG
              icon="help"
              viewBox="0 0 24 24"
              style={{
                fill: "transparent",
                height: "18px",
                paddingRight: "4px",
                stroke: "white",
                strokeLinecap: "round",
                strokeWidth: "2px",
                verticalAlign: "middle",
              }}
            />{" "}
            <span>Read the App Basics FAQ</span>
          </button>
        </Link>
        <Link style={{ margin: "0 8px" }} to="https://lbry.org/faq">
          <button
            style={{
              backgroundColor: "rgba(17, 17, 17, 0.4)",
              // backgroundColorHover: 'rgba(17, 17, 17, 0.7)',
              border: "none",
              borderRadius: "6px",
              color: "white",
              cursor: "pointer",
              fontWeight: "700",
              height: "40px",
              padding: "0 16px",
            }}
          >
            <CustomSVG
              icon="help"
              viewBox="0 0 24 24"
              style={{
                fill: "transparent",
                height: "18px",
                paddingRight: "4px",
                stroke: "white",
                strokeLinecap: "round",
                strokeWidth: "2px",
                verticalAlign: "middle",
              }}
            />{" "}
            <span>View all LBRY FAQs</span>
          </button>
        </Link>
      </div>
      <h2>Find assistance</h2>
      <div style={{ padding: "16px 0" }}>
        <p>
          Live help is available most hours in the #help channel of our Discord
          chat room. Or you can always email us at{" "}
          <Link to="mailto:board@lbry.org">board@lbry.org</Link>.
        </p>
        <Link style={{ margin: "0 8px" }} to="https://chat.lbry.org">
          <button
            style={{
              backgroundColor: "rgba(17, 17, 17, 0.4)",
              // backgroundColorHover: 'rgba(17, 17, 17, 0.7)',
              border: "none",
              borderRadius: "6px",
              color: "white",
              cursor: "pointer",
              fontWeight: "700",
              height: "40px",
              padding: "0 16px",
            }}
          >
            <CustomSVG
              icon="chat"
              viewBox="0 0 24 24"
              style={{
                fill: "transparent",
                height: "18px",
                paddingRight: "4px",
                stroke: "white",
                strokeLinecap: "round",
                strokeWidth: "2px",
                verticalAlign: "middle",
              }}
            />{" "}
            <span>Join Our Chat</span>
          </button>
        </Link>
        <Link style={{ margin: "0 8px" }} to="mailto:board@lbry.org">
          <button
            style={{
              backgroundColor: "rgba(17, 17, 17, 0.4)",
              // backgroundColorHover: 'rgba(17, 17, 17, 0.7)',
              border: "none",
              borderRadius: "6px",
              color: "white",
              cursor: "pointer",
              fontWeight: "700",
              height: "40px",
              padding: "0 16px",
            }}
          >
            <CustomSVG
              icon="world"
              viewBox="0 0 24 24"
              style={{
                fill: "transparent",
                height: "18px",
                paddingRight: "4px",
                stroke: "white",
                strokeLinecap: "round",
                strokeWidth: "2px",
                verticalAlign: "middle",
              }}
            />{" "}
            <span>Email Us</span>
          </button>
        </Link>
      </div>
      <h2>About</h2>
      <div style={{ padding: "16px 0" }}>
        <table style={{ width: "100%" }}>
          <tbody>
            <tr>
              <th
                style={{
                  borderBottom: "1px solid rgb(51, 51, 56)",
                  padding: "6px 0",
                  paddingRight: "50px",
                  textAlign: "left",
                  whiteSpace: "nowrap",
                  width: "0%",
                }}
              >
                App
              </th>
              <td style={{ borderBottom: "1px solid rgb(51, 51, 56)" }}>
                {packageJSON.version}
              </td>
            </tr>
            <tr>
              <th
                style={{
                  borderBottom: "1px solid rgb(51, 51, 56)",
                  padding: "6px 0",
                  paddingRight: "50px",
                  textAlign: "left",
                  whiteSpace: "nowrap",
                  width: "0%",
                }}
              >
                Daemon
              </th>
              <td style={{ borderBottom: "1px solid rgb(51, 51, 56)" }}>
                {versionResponse ? (
                  versionResponse.error ? (
                    <Error message={versionResponse.error.message} />
                  ) : (
                    versionResponse.result.version
                  )
                ) : (
                  <Loader />
                )}
              </td>
            </tr>
            <tr>
              <th
                style={{
                  borderBottom: "1px solid rgb(51, 51, 56)",
                  padding: "6px 0",
                  paddingRight: "50px",
                  textAlign: "left",
                  whiteSpace: "nowrap",
                  width: "0%",
                }}
              >
                Platform
              </th>
              <td style={{ borderBottom: "1px solid rgb(51, 51, 56)" }}>
                {versionResponse ? (
                  versionResponse.error ? (
                    <Error message={versionResponse.error.message} />
                  ) : (
                    versionResponse.result.platform
                  )
                ) : (
                  <Loader />
                )}
              </td>
            </tr>
            <tr>
              <th
                style={{
                  borderBottom: "1px solid rgb(51, 51, 56)",
                  padding: "6px 0",
                  paddingRight: "50px",
                  textAlign: "left",
                  whiteSpace: "nowrap",
                  width: "0%",
                }}
              >
                Installation ID
              </th>
              <td style={{ borderBottom: "1px solid rgb(51, 51, 56)" }}>
                {statusResponse ? (
                  statusResponse.error ? (
                    <Error message={statusResponse.error.message} />
                  ) : (
                    statusResponse.result.installation_id
                  )
                ) : (
                  <Loader />
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default HelpPage;
