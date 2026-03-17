import React, { JSX } from "react";
import CustomSVG from "~/components/CustomSVG";

function ServersPage(): JSX.Element {
  var daemons = [
    {
      name: "My local LBRY setup",
      url: "http://localhost:5279",
      state: "online",
    },
    {
      name: "Odysee",
      url: "https://api.na-backend.odysee.com/api/v1/proxy",
      state: "pinging",
    },
    { name: "Madiator", url: "https://lbry.madiator.com", state: "offline" },
  ];

  return (
    <div style={{ textAlign: "center" }}>
      <div>
        <CustomSVG
          icon="logo"
          style={{
            fill: "white",
            height: "120px",
            verticalAlign: "middle",
            width: "120px",
          }}
          viewBox="0 0 322 254"
        />
        <h1 style={{ display: "inline", padding: "16px" }}>LBRY Nova</h1>
      </div>
      <br />
      <br />
      <span>Select the LBRY daemon you want to use:</span>
      <br />
      <br />
      {daemons.map((daemon: unknown, i: number) => (
        <a
          href="#"
          key={i}
          style={{
            border: "1px solid gray",
            color: "white",
            display: "inline-block",
            height: "120px",
            margin: "8px",
            padding: "8px",
            textAlign: "left",
            textDecoration: "none",
            verticalAlign: "middle",
            width: "280px",
          }}
        >
          <span style={{ fontSize: "20px" }}>
            <b>{daemon.name}</b>
          </span>
          <br />
          <span style={{ color: "gray" }}>{daemon.url}</span>
          <br />
          <br />
          {daemon.state === "pinging" ? (
            <b
              style={{
                backgroundColor: "gray",
                borderRadius: "10px",
                color: "white",
                padding: "4px",
              }}
            >
              PINGING
            </b>
          ) : null}
          {daemon.state === "offline" ? (
            <b
              style={{
                backgroundColor: "red",
                borderRadius: "10px",
                color: "white",
                padding: "4px",
              }}
            >
              OFFLINE
            </b>
          ) : null}
          {daemon.state === "online" ? (
            <b
              style={{
                backgroundColor: "lime",
                borderRadius: "10px",
                color: "black",
                padding: "4px",
              }}
            >
              ONLINE
            </b>
          ) : null}
        </a>
      ))}

      <a
        href="#"
        style={{
          border: "1px solid gray",
          display: "inline-block",
          height: "120px",
          margin: "8px",
          padding: "8px",
          verticalAlign: "middle",
          width: "280px",
        }}
      >
        <span style={{ lineHeight: "120px" }}>
          <b>+ Add new daemon</b>
        </span>
      </a>
    </div>
  );
}

export default ServersPage;
