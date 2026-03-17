import { JSX, useEffect, useState } from "react";
import { NOT_TAGS } from "~/Constants";
import useDaemonRPC from "~/DaemonRPC";
import LBRY from "~/LBRY";
import ClaimPreviewTile from "~/components/ClaimPreviewTile";
import Loader from "~/components/Loader";

function HomePage(): JSX.Element {
  const daemonRPC: string = useDaemonRPC();

  const [row1, setRow1] = useState<object[]>([]);
  const [row2, setRow2] = useState<object[]>([]);
  const [row3, setRow3] = useState<object[]>([]);

  useEffect((): void => {
    const searchOptions: object = {
      page_size: 4,
      claim_type: ["stream", "repost", "channel"],
      no_totals: true,
      any_tags: [],
      not_tags: NOT_TAGS,
      channel_ids: [
        "80d2590ad04e36fb1d077a9b9e3a8bba76defdf8",
        "b58dfaeab6c70754d792cdd9b56ff59b90aea334",
      ],
      not_channel_ids: [],
      order_by: ["release_time"],
      has_source: true,
      release_time: ">1731193200",
      include_purchase_receipt: true,
    };

    LBRY.rpc(
      daemonRPC,
      LBRY.CLAIM_SEARCH,
      searchOptions,
      undefined,
      LBRY.isUsingProxy(),
    ).then((json: object): void => {
      setRow1(json.result.items);
    });
  }, [daemonRPC]);

  useEffect((): void => {
    LBRY.rpc(
      daemonRPC,
      LBRY.CLAIM_SEARCH,
      {
        page_size: 4,
        claim_type: ["stream"],
        no_totals: true,
        any_tags: [],
        not_tags: NOT_TAGS,
        channel_ids: [],
        not_channel_ids: [],
        order_by: ["effective_amount"],
        has_source: true,
        release_time: ">1762902000",
        limit_claims_per_channel: 2,
        include_purchase_receipt: true,
      },
      undefined,
      LBRY.isUsingProxy(),
    ).then((json: object): void => {
      setRow2(json.result.items);
    });
  }, [daemonRPC]);

  useEffect((): void => {
    LBRY.rpc(
      daemonRPC,
      LBRY.CLAIM_SEARCH,
      {
        page_size: 4,
        claim_type: ["stream", "repost", "channel"],
        no_totals: true,
        any_tags: [],
        not_tags: NOT_TAGS,
        channel_ids: ["3fda836a92faaceedfe398225fb9b2ee2ed1f01a"],
        not_channel_ids: [],
        order_by: ["release_time"],
        has_source: true,
        include_purchase_receipt: true,
      },
      undefined,
      LBRY.isUsingProxy(),
    ).then((json: object): void => {
      setRow3(json.result.items);
    });
  }, [daemonRPC]);

  return (
    <>
      <div className="claim-preview-section">
        {(row1 &&
          row1.map((cell: unknown, i: number) => (
            <ClaimPreviewTile claim={cell} key={i} />
          ))) || <Loader />}
      </div>
      {row2.length > 0 ? <h2>Top Content from Today</h2> : null}
      <div className="claim-preview-section">
        {row2.map((cell: unknown, i: number) => (
          <ClaimPreviewTile claim={cell} key={i} />
        ))}
      </div>
      {row3.length > 0 ? <h2>Latest From @lbry</h2> : null}
      <div className="claim-preview-section">
        {row3.map((cell: unknown, i: number) => (
          <ClaimPreviewTile claim={cell} key={i} />
        ))}
      </div>
    </>
  );
}

export default HomePage;
