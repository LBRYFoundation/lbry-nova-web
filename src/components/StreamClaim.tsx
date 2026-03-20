import Props, { JSX, useEffect, useState } from "react";
import Markdown from "react-markdown";
import LBRY from "~/LBRY";

function downloadMarkdownFile(claimGetData, setMarkdown): void {
  const url: string = claimGetData?.streaming_url;

  if (url) {
    const input: URL = new URL("/api/proxy", window.location.href);
    input.searchParams.set("url", url);

    fetch(input).then((resp: Response): void => {
      resp.text().then((text: string): void => {
        setMarkdown(text);
      });
    });
  }
}

function StreamClaim({ data }: Props & { data: Stream }): JSX.Element {
  const [claimGetData, setClaimGetData] = useState<object[unknown]>(null);
  const [markdown, setMarkdown] = useState<string>("");

  useEffect((): void => {
    LBRY.rpc(
      LBRY.getDaemonRPC(),
      LBRY.GET,
      { uri: data.canonical_url },
      undefined,
      LBRY.isUsingProxy(),
    ).then((json: object): void => {
      setClaimGetData(json.result);
    });
  }, [data]);

  //
  const [recommendedIsChannelItems, setRecommendedIsChannelItems] =
    useState<boolean>(false);

  // return (
  //   <div style={{ display: "flex" }}>
  //     <div style={{ flex: "1" }}>
  //       <div id="claim">
  //         {claimResolveData ? (
  //           claimResolveData.type === "claim" ? (
  //             <Claim data={claimResolveData} />
  //           ) : (
  //             <Error message="Type isn't a claim." />
  //           )
  //         ) : (
  //           <Loader />
  //         )}
  //       </div>
  //       <div id="comments" style={{ paddingTop: "16px", textAlign: "center" }}>
  //         Cannot load comments
  //       </div>
  //     </div>
  //     <div id="recommended" style={{ width: "375px" }}>
  //       <div>
  //         <span
  //           onClick={() => setRecommendedIsChannelItems(false)}
  //           style={{
  //             backgroundColor: recommendedIsChannelItems
  //               ? "rgba(17, 17, 17, 0.4)"
  //               : "rgb(17, 17, 17)",
  //             borderRadius: "16px",
  //             cursor: "pointer",
  //             display: "inline-block",
  //             fontSize: "14px",
  //             lineHeight: "32px",
  //             padding: "0 12px",
  //           }}
  //         >
  //           Related
  //         </span>
  //         &nbsp;
  //         <span
  //           onClick={() => setRecommendedIsChannelItems(true)}
  //           style={{
  //             backgroundColor: recommendedIsChannelItems
  //               ? "rgb(17, 17, 17)"
  //               : "rgba(17, 17, 17, 0.4)",
  //             borderRadius: "16px",
  //             cursor: "pointer",
  //             display: "inline-block",
  //             fontSize: "14px",
  //             lineHeight: "32px",
  //             padding: "0 12px",
  //           }}
  //         >
  //           More from this channel
  //         </span>
  //       </div>
  //       <div style={{ padding: "16px", textAlign: "center" }}>
  //         Cannot load recommendations.
  //       </div>
  //     </div>
  //   </div>
  // );

  return (
    <div>
      <h1>{data.value?.title}</h1>
      {data.value?.stream_type === "audio" ? (
        <div>
          <audio controls src={claimGetData?.streaming_url || null}></audio>
        </div>
      ) : null}
      {data.value?.stream_type === "document" ? (
        <div style={{ paddingTop: "16px" }}>
          {data.value.source.media_type === "text/markdown" ? (
            claimGetData ? (
              <div className="markdown">
                {downloadMarkdownFile(claimGetData, setMarkdown) && null}
                <Markdown>{markdown}</Markdown>
              </div>
            ) : null
          ) : (
            <iframe
              src={claimGetData?.streaming_url}
              style={{ border: 0, height: "700px", width: "100%" }}
            >
              Your system doesn't support iFrames.
            </iframe>
          )}
        </div>
      ) : null}
      {data.value?.stream_type === "image" ? (
        <div>
          <img alt="Image" src={claimGetData?.streaming_url || null} />
        </div>
      ) : null}
      {data.value?.stream_type === "video" ? (
        <div>
          <video
            controls
            src={claimGetData?.streaming_url || null}
            style={{
              backgroundColor: "black",
              height: "500px",
              marginTop: "16px",
              width: "100%",
            }}
          ></video>
        </div>
      ) : null}
    </div>
  );
}

export default StreamClaim;
