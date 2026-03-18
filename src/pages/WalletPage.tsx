import React, { JSX, useEffect, useState } from "react";
import { Link } from "react-router";
import LBRY from "~/LBRY";
import Error from "~/components/Error";
import Loader from "~/components/Loader";

function WalletPage(): JSX.Element {
  const [walletResponse, setWalletResponse] = useState<object>(undefined);
  const [transactionsResponse, setTransactionsResponse] =
    useState<object>(undefined);

  useEffect((): void => {
    LBRY.rpc(
      LBRY.getDaemonRPC(),
      LBRY.WALLET_BALANCE,
      undefined,
      undefined,
      LBRY.isUsingProxy(),
    ).then((json: object): void => {
      setWalletResponse(json);
    });
  }, []);

  useEffect((): void => {
    LBRY.rpc(
      LBRY.getDaemonRPC(),
      LBRY.TXO_LIST,
      undefined,
      undefined,
      LBRY.isUsingProxy(),
    ).then((json: object): void => {
      setTransactionsResponse(json);
    });
  }, []);

  return (
    <>
      <h1>Wallet</h1>
      {walletResponse ? (
        walletResponse.error ? (
          <Error message={walletResponse.error.message} />
        ) : (
          <div id="wallet" style={{ padding: "16px 0" }}>
            <span>
              <b>Available:</b> {walletResponse?.result?.available}
            </span>
          </div>
        )
      ) : (
        <Loader />
      )}
      <h2>Transactions</h2>
      {transactionsResponse ? (
        transactionsResponse.error ? (
          <Error message={transactionsResponse.error.message} />
        ) : (
          <div id="transactions" style={{ padding: "16px 0" }}>
            <table style={{ width: "100%" }}>
              <thead>
                <tr style={{ height: "40px" }}>
                  <th
                    style={{
                      borderBottom: "1px solid rgb(51, 51, 56)",
                      padding: "8px 0",
                      textAlign: "left",
                    }}
                  >
                    Date
                  </th>
                  <th
                    style={{
                      borderBottom: "1px solid rgb(51, 51, 56)",
                      padding: "8px 0",
                      textAlign: "left",
                    }}
                  >
                    Type
                  </th>
                  <th
                    style={{
                      borderBottom: "1px solid rgb(51, 51, 56)",
                      padding: "8px 0",
                      textAlign: "left",
                    }}
                  >
                    Details
                  </th>
                  <th
                    style={{
                      borderBottom: "1px solid rgb(51, 51, 56)",
                      padding: "8px 0",
                      textAlign: "left",
                    }}
                  >
                    Transaction
                  </th>
                  <th
                    style={{
                      borderBottom: "1px solid rgb(51, 51, 56)",
                      padding: "8px 0",
                      textAlign: "right",
                    }}
                  >
                    LBC
                  </th>
                </tr>
              </thead>
              <tbody>
                {transactionsResponse?.result?.items?.map(
                  (transaction: unknown, i: number): JSX.Element => (
                    <tr key={i}>
                      <td style={{ padding: "8px 0" }}>
                        <span style={{ fontSize: 12, fontWeight: 700 }}>
                          {((): string => {
                            const date: Date = new Date(0);
                            date.setUTCSeconds(transaction.timestamp);
                            return (
                              ("" + date.getUTCDate()).padStart(2, "0") +
                              "-" +
                              ("" + (date.getUTCMonth() + 1)).padStart(2, "0") +
                              "-" +
                              ("" + date.getUTCFullYear())
                            );
                          })()}
                        </span>
                        <br />
                        <span style={{ fontSize: 12, fontWeight: 700 }}>
                          {((): string => {
                            const date: Date = new Date(0);
                            date.setUTCSeconds(transaction.timestamp);
                            return (
                              ("" + date.getUTCHours()).padStart(2, "0") +
                              ":" +
                              ("" + date.getUTCMinutes()).padStart(2, "0") +
                              ":" +
                              ("" + date.getUTCSeconds()).padStart(2, "0")
                            );
                          })()}
                        </span>
                      </td>
                      <td style={{ padding: "8px 0" }}>
                        {transaction.type === "payment"
                          ? "Payment"
                          : transaction.type}
                      </td>
                      <td style={{ padding: "8px 0" }}></td>
                      <td style={{ padding: "8px 0" }}>
                        <Link
                          style={{
                            color: "rgb(43, 187, 144)",
                            textDecoration: "none",
                          }}
                          to={`https://explorer.lbry.org/tx/${transaction.txid}`}
                          target="_blank"
                        >
                          {transaction.txid.substring(0, 8)}
                        </Link>
                      </td>
                      <td style={{ padding: "8px 0", textAlign: "right" }}>
                        {transaction.amount}
                      </td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          </div>
        )
      ) : (
        <Loader />
      )}
    </>
  );
}

export default WalletPage;
