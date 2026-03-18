import React, { JSX, useEffect, useState } from "react";
import { NOT_TAGS } from "~/Constants";
import LBRY from "~/LBRY";
import ClaimPreviewTile from "~/components/ClaimPreviewTile";
import CustomSVG from "~/components/CustomSVG";
import Error from "~/components/Error";
import Loader from "~/components/Loader";

function FollowingPage(): JSX.Element {
  const [localPreferenceResponse, setLocalPreferenceResponse] =
    useState<object>(undefined);
  const [channelIDs, setChannelIDs] = useState<string[]>([]);
  const [items, setItems] = useState<object[] | string | null>(null);
  const [toggle, setToggle] = useState<string>("new");

  useEffect((): void => {
    LBRY.rpc(
      LBRY.getDaemonRPC(),
      LBRY.PREFERENCE_GET,
      { key: "local" },
      null,
      LBRY.isUsingProxy(),
    ).then((json: object): void => {
      setLocalPreferenceResponse(json);
      if (json?.result?.local?.subscriptions) {
        setChannelIDs(
          json?.result?.local?.subscriptions.map(
            (subscription: string): string =>
              subscription.substring(subscription.indexOf("#")),
          ),
        );
      }
    });
  }, []);

  useEffect((): void => {
    const orderBy: string =
      (toggle === "new" ? "release_time" : "") +
      (toggle === "trending" ? "trending_score" : "") +
      (toggle === "top" ? "effective_amount" : "");

    const hourAgo: number = (Date.now() - 3600000) / 1000;

    const releaseTime: string =
      (toggle === "new" ? "<" + hourAgo : "") +
      (toggle === "trending" ? "<" + hourAgo : "") +
      (toggle === "top" ? ">" + hourAgo : "");

    // "<1765920600"

    const searchOptions: object = {
      page_size: 20,
      page: 1,
      channel_ids: channelIDs,
      claim_type: ["stream", "repost", "channel"],
      no_totals: true,
      not_channel_ids: [],
      not_tags: NOT_TAGS,
      order_by: [orderBy],
      has_source: true,
      release_time: releaseTime,
      include_purchase_receipt: true,
    };

    LBRY.rpc(
      LBRY.getDaemonRPC(),
      LBRY.CLAIM_SEARCH,
      searchOptions,
      undefined,
      LBRY.isUsingProxy(),
    ).then((json: object): void => {
      setItems(json.result.items || json.error?.message || "Unknown error");
    });
  }, [channelIDs, toggle]);

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
            padding: open ? "0px 8px 0px 12px" : null,
          }}
          icon="heart"
          viewBox="0 0 24 24"
        />{" "}
        <span style={{ verticalAlign: "middle" }}>Following</span>
      </h1>
      {localPreferenceResponse ? (
        localPreferenceResponse.error ? (
          <Error message={localPreferenceResponse.error.message} />
        ) : (
          <>
            <div style={{ padding: "16px 0" }}>
              <div>
                <button
                  onClick={(): void => {
                    if (toggle !== "new") {
                      setItems(null);
                    }
                    setToggle("new");
                  }}
                  style={{
                    backgroundColor:
                      toggle == "new"
                        ? "rgb(17, 17, 17)"
                        : "rgba(17, 17, 17, 0.4)",
                    // backgroundColorHover: 'rgba(17, 17, 17, 0.7)',
                    border: "none",
                    borderRadius: "6px 0 0 6px",
                    color: "white",
                    cursor: "pointer",
                    fontWeight: "700",
                    height: "40px",
                    padding: "0 16px",
                  }}
                >
                  <span>New</span>
                </button>
                <button
                  onClick={(): void => {
                    if (toggle !== "trending") {
                      setItems(null);
                    }
                    setToggle("trending");
                  }}
                  style={{
                    backgroundColor:
                      toggle == "trending"
                        ? "rgb(17, 17, 17)"
                        : "rgba(17, 17, 17, 0.4)",
                    // backgroundColorHover: 'rgba(17, 17, 17, 0.7)',
                    border: "none",
                    color: "white",
                    cursor: "pointer",
                    fontWeight: "700",
                    height: "40px",
                    padding: "0 16px",
                  }}
                >
                  Trending
                </button>
                <button
                  onClick={(): void => {
                    if (toggle !== "top") {
                      setItems(null);
                    }
                    setToggle("top");
                  }}
                  style={{
                    backgroundColor:
                      toggle == "top"
                        ? "rgb(17, 17, 17)"
                        : "rgba(17, 17, 17, 0.4)",
                    // backgroundColorHover: 'rgba(17, 17, 17, 0.7)',
                    border: "none",
                    borderRadius: "0 6px 6px 0",
                    color: "white",
                    cursor: "pointer",
                    fontWeight: "700",
                    height: "40px",
                    padding: "0 16px",
                  }}
                >
                  Top
                </button>
              </div>
            </div>
            <div style={{ padding: "16px 0", textAlign: "center" }}>
              {items === null ? (
                <Loader />
              ) : "string" === typeof items ? (
                <span style={{ color: "red" }}>{items}</span>
              ) : items.length > 0 ? (
                items.map((cell: unknown, i: number) => (
                  <ClaimPreviewTile claim={cell} key={i} />
                ))
              ) : (
                "No items"
              )}
            </div>
          </>
        )
      ) : (
        <Loader />
      )}
    </>
  );
}

export default FollowingPage;
