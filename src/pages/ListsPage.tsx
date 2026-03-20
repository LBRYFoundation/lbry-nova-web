import React, { JSX } from "react";
import CustomSVG from "~/components/CustomSVG";
import Error from "~/components/Error";
import Loader from "~/components/Loader";

function ListsPage(): JSX.Element {
  const localPreferenceResponse: object = {
    error: {
      message: "Not yet implemented.",
    },
  };

  return (
    <>
      <h1>
        <CustomSVG
          style={{
            fill: "transparent",
            height: "24",
            width: "24",
            verticalAlign: "middle",
            stroke: "white",
            strokeWidth: "2px",
          }}
          icon="stack"
          viewBox="0 0 24 24"
        />{" "}
        <span style={{ verticalAlign: "middle" }}>Lists</span>
      </h1>
      {localPreferenceResponse ? (
        localPreferenceResponse.error ? (
          <Error message={localPreferenceResponse.error.message} />
        ) : (
          <>TODO Lists page</>
        )
      ) : (
        <Loader />
      )}
    </>
  );
}

export default ListsPage;
