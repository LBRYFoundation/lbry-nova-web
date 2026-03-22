import Props, { JSX, useEffect, useState } from "react";
import { Link } from "react-router";
import { NOT_TAGS } from "~/Constants";
import LBRY from "~/LBRY";
import ClaimPreviewTile from "~/components/ClaimPreviewTile";
import CustomSVG from "~/components/CustomSVG";
import Error from "~/components/Error";

function ChannelClaim({ data }: Props & { data: Channel }): JSX.Element {
  const [tab, setTab] = useState<string>("content");
  const [content, setContent] = useState<object[]>([]);
  const [playlists, setPlaylists] = useState<object[]>([]);

  useEffect((): void => {
    LBRY.rpc(
      LBRY.getDaemonRPC(),
      LBRY.CLAIM_SEARCH,
      {
        page_size: 20,
        page: 1,
        claim_type: ["stream", "repost"],
        no_totals: true,
        not_tags: NOT_TAGS,
        order_by: ["release_time"],
        has_source: true,
        fee_amount: ">=0",
        channel_ids: [data.claim_id],
        release_time: "<1765038660",
        include_purchase_receipt: true,
      },
      undefined,
      LBRY.isUsingProxy(),
    ).then((json: object): void => {
      setContent(json.result.items);
    });
  }, [data.claim_id]);

  useEffect((): void => {
    LBRY.rpc(
      LBRY.getDaemonRPC(),
      LBRY.CLAIM_SEARCH,
      {
        page_size: 20,
        page: 1,
        claim_type: ["collection"],
        no_totals: true,
        not_tags: NOT_TAGS,
        order_by: ["release_time"],
        has_source: true,
        fee_amount: ">=0",
        channel_ids: [data.claim_id],
        release_time: "<1765037880",
        include_purchase_receipt: true,
      },
      undefined,
      LBRY.isUsingProxy(),
    ).then((json: object): void => {
      setPlaylists(json.result.items);
    });
  }, [data.claim_id]);

  return (
    <div>
      <div id="channel-header">
        <div
          style={{
            backgroundColor: "black",
            backgroundImage: `url(${data.value.cover?.url})`,
            backgroundSize: "cover",
            borderTopLeftRadius: "6px",
            borderTopRightRadius: "6px",
            height: "210px",
          }}
        >
          <div
            style={{
              backgroundImage:
                "linear-gradient(to right, black,transparent 50%)",
              height: "100%",
            }}
          >
            <img
              alt="Channel Logo"
              src={
                data.value.thumbnail?.url ||
                "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
              }
              style={{
                borderRadius: "100%",
                height: "160px",
                padding: "25px",
                verticalAlign: "middle",
              }}
            />
            <div style={{ display: "inline-block", verticalAlign: "middle" }}>
              <span style={{ fontSize: "32px", fontWeight: "700" }}>
                {data.value.title}
              </span>
            </div>
          </div>
        </div>
        <div
          style={{
            backgroundColor: "rgba(17, 17, 17, 0.9)",
            borderBottomLeftRadius: "6px",
            borderBottomRightRadius: "6px",
          }}
        >
          <Link
            onClick={(): void => setTab("content")}
            style={{
              color: "white",
              display: "inline-block",
              fontSize: "16px",
              fontWeight: "700",
              lineHeight: "24px",
              padding: "16px",
              textDecoration: "none",
            }}
            to={null}
          >
            Content
          </Link>
          <Link
            onClick={(): void => setTab("playlists")}
            style={{
              color: "white",
              display: "inline-block",
              fontSize: "16px",
              fontWeight: "700",
              lineHeight: "24px",
              padding: "16px",
              textDecoration: "none",
            }}
            to={null}
          >
            Playlists
          </Link>
          <Link
            onClick={(): void => setTab("about")}
            style={{
              color: "white",
              display: "inline-block",
              fontSize: "16px",
              fontWeight: "700",
              lineHeight: "24px",
              padding: "16px",
              textDecoration: "none",
            }}
            to={null}
          >
            About
          </Link>
          <Link
            onClick={(): void => setTab("community")}
            style={{
              color: "white",
              display: "inline-block",
              fontSize: "16px",
              fontWeight: "700",
              lineHeight: "24px",
              padding: "16px",
              textDecoration: "none",
            }}
            to={null}
          >
            Community
          </Link>
        </div>
      </div>
      <div style={{ paddingTop: "32px" }}>
        {tab === "content" ? (
          <div style={{ textAlign: "center" }}>
            {content.map((item: object, i: number) => (
              <ClaimPreviewTile claim={item} key={i} />
            ))}
          </div>
        ) : null}
        {tab === "playlists"
          ? playlists.map((item: object, i: number) => (
              <ClaimPreviewTile claim={item} key={i} />
            ))
          : null}
        {tab === "about" ? (
          <section>
            {data.value.description ? (
              <div style={{ padding: "16px 8px" }}>
                <label style={{ display: "block", fontWeight: "bold" }}>
                  Description
                </label>
                <span>{data.value.description}</span>
              </div>
            ) : null}
            {data.value.email ? (
              <div style={{ padding: "16px 8px" }}>
                <label style={{ display: "block", fontWeight: "bold" }}>
                  Contact
                </label>
                <Link
                  style={{ display: "block" }}
                  to={`mailto:${data.value.email}`}
                >
                  {data.value.email}
                </Link>
              </div>
            ) : null}
            {data.value.website_url ? (
              <div style={{ padding: "16px 8px" }}>
                <label style={{ display: "block", fontWeight: "bold" }}>
                  Site
                </label>
                {data.value.website_url}
              </div>
            ) : null}
            {data.value.tags?.length > 0 ? (
              <div style={{ padding: "16px 8px" }}>
                <label style={{ display: "block", fontWeight: "bold" }}>
                  Tags
                </label>
                {data.value.tags.map((tag: string, i: number) => (
                  // TODO Make links
                  <span
                    key={i}
                    style={{
                      backgroundColor: "red",
                      borderRadius: "6px",
                      margin: "0 2px",
                      padding: "0 4px",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
            {data.meta.claims_in_channel ? (
              <div style={{ padding: "16px 8px" }}>
                <label style={{ display: "block", fontWeight: "bold" }}>
                  Total Uploads
                </label>
                <span>{data.meta.claims_in_channel}</span>
              </div>
            ) : null}
            {data.timestamp ? (
              <div style={{ padding: "16px 8px" }}>
                <label style={{ display: "block", fontWeight: "bold" }}>
                  Last Updated
                </label>
                <span>{/*TODO*/}</span>
              </div>
            ) : null}
            {data.canonical_url ? (
              <div style={{ padding: "16px 8px" }}>
                <label style={{ display: "block", fontWeight: "bold" }}>
                  URL
                </label>
                <span>{data.canonical_url}</span>
              </div>
            ) : null}
            {data.claim_id ? (
              <div style={{ padding: "16px 8px" }}>
                <label style={{ display: "block", fontWeight: "bold" }}>
                  Claim ID
                </label>
                <span>{data.claim_id}</span>
              </div>
            ) : null}
            {data.meta.effective_amount ? (
              <div style={{ padding: "16px 8px" }}>
                <label style={{ display: "block", fontWeight: "bold" }}>
                  Staked LBRY Credits
                </label>
                <div>
                  <CustomSVG
                    icon="lbc"
                    style={{ height: "16px", verticalAlign: "middle" }}
                    viewBox="0 0 24 24"
                  />
                  &nbsp;
                  <span style={{ verticalAlign: "middle" }}>
                    {Math.floor(data.meta.effective_amount * 100000)}
                  </span>
                </div>
              </div>
            ) : null}
          </section>
        ) : null}
        {tab === "community" ? <Error message="Cannot load comments" /> : null}
      </div>
      {/*<div style={{paddingTop:'32px'}}>{JSON.stringify(data)}</div>*/}
    </div>
  );
}

export default ChannelClaim;
