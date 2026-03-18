import React, {
  ChangeEvent,
  JSX,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Link,
  Location,
  NavigateFunction,
  NavigateOptions,
  NavLink,
  useLocation,
  useNavigate,
} from "react-router";
import useAppHistory from "~/AppHistory";
import LBRY from "~/LBRY";
import CustomSVG from "~/components/CustomSVG";

function Header({ menuOpen, menuOpenSetter }): JSX.Element {
  const appHistory: object = useAppHistory();

  const location: Location = useLocation();
  const navigate: NavigateFunction = useNavigate();

  const urlQuery: string = new URLSearchParams(location.search).get("q") || "";
  const [query, setQuery] = useState<string>("");

  const [headerMenu, setHeaderMenu] = useState<
    "back" | "next" | "upload" | "settings" | "account" | null
  >(null);
  const backMenu: RefObject<HTMLUListElement> = useRef<HTMLUListElement>(null);
  const nextMenu: RefObject<HTMLUListElement> = useRef<HTMLUListElement>(null);
  const uploadMenu: RefObject<HTMLUListElement> =
    useRef<HTMLUListElement>(null);
  const settingsMenu: RefObject<HTMLUListElement> =
    useRef<HTMLUListElement>(null);
  const accountMenu: RefObject<HTMLUListElement> =
    useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!headerMenu) {
      return;
    }

    function handleClick(ev: MouseEvent): void {
      if (
        (headerMenu === "back" &&
          backMenu.current &&
          !backMenu.current.parentNode.contains(ev.target as Node)) ||
        (headerMenu === "next" &&
          nextMenu.current &&
          !nextMenu.current.parentNode.contains(ev.target as Node)) ||
        (headerMenu === "upload" &&
          uploadMenu.current &&
          !uploadMenu.current.parentNode.contains(ev.target as Node)) ||
        (headerMenu === "settings" &&
          settingsMenu.current &&
          !settingsMenu.current.parentNode.contains(ev.target as Node)) ||
        (headerMenu === "account" &&
          accountMenu.current &&
          !accountMenu.current.parentNode.contains(ev.target as Node))
      ) {
        setHeaderMenu(null);
      }
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [headerMenu]);

  useEffect((): void => {
    setQuery(urlQuery);
  }, [urlQuery]);

  function handleSubmitSearch(event: SubmitEvent): boolean {
    event.preventDefault();
    const form: HTMLFormElement = event.target as HTMLFormElement;
    const formData: FormData = new FormData(form);
    const query: string = formData.get("q") as string;

    const options: NavigateOptions = {
      state: {
        q: query,
      },
    };
    navigate(form.action + `?q=${encodeURIComponent(query)}`, options);
    return false;
  }

  return (
    <header>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          overflow: "hidden",
          padding: "10px 16px",
          whiteSpace: "nowrap",
        }}
      >
        <div style={{ justifyContent: "flex-start" }}>
          <NavLink
            className={
              menuOpen
                ? "hoverHeaderButtonFill menu-open"
                : "hoverHeaderButtonFill"
            }
            onClick={(): void => {
              menuOpenSetter(!menuOpen);
            }}
            style={{
              backgroundColor: "rgba(45, 45, 45, 0.7)",
              borderRadius: "1.5rem",
              display: "inline-block",
              height: "40px",
              textAlign: "center",
              verticalAlign: "middle",
              marginRight: "10px",
              width: "40px",
            }}
            to={null}
          >
            <CustomSVG
              icon="menu"
              viewBox="0 0 24 24"
              style={{ height: "16px", padding: "12px 0" }}
            />
          </NavLink>
          <Link
            className="hoverHeaderButton"
            style={{ fill: "white", margin: "0 10px", textDecoration: "none" }}
            to="/"
          >
            <CustomSVG
              icon="logo"
              style={{ height: "40px", verticalAlign: "middle", width: "40px" }}
              viewBox="0 0 322 254"
            />
            <span
              style={{
                fontSize: "16px",
                fontWeight: "700",
                marginLeft: "10px",
                verticalAlign: "middle",
              }}
            >
              LBRY Nova
            </span>
          </Link>
        </div>
        <div style={{ justifyContent: "center" }}>
          <div style={{ display: "inline-block" }}>
            <div style={{ display: "inline-block" }}>
              <NavLink
                className="hoverHeaderButtonFill"
                disabled={appHistory.getPrevious().length === 0}
                onClick={
                  appHistory.getPrevious().length > 0
                    ? (): void => {
                        navigate(-1);
                      }
                    : null
                }
                onContextMenu={(ev: unknown): void => {
                  ev.preventDefault();
                  setHeaderMenu("back");
                }}
                to={null}
                style={{
                  backgroundColor: "rgba(45, 45, 45, 0.7)",
                  borderRadius: "1.5rem",
                  display: "inline-block",
                  height: "40px",
                  marginRight: "10px",
                  textAlign: "center",
                  verticalAlign: "middle",
                  width: "40px",
                }}
              >
                <CustomSVG
                  icon="arrow-left"
                  viewBox="0 0 24 24"
                  style={{ height: "18px", padding: "11px 0" }}
                />
              </NavLink>
              {headerMenu === "back" && appHistory.getPrevious().length ? (
                <ul ref={backMenu}>
                  {appHistory.getPrevious().map((item: object, i: number) => (
                    <li key={i}>
                      <NavLink onClick={() => navigate(-(i + 1))} to={null}>
                        {item["title"]}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
            <div style={{ display: "inline-block" }}>
              <NavLink
                className="hoverHeaderButtonFill"
                disabled={appHistory.getNext().length === 0}
                onClick={
                  appHistory.getNext().length > 0
                    ? (): void => {
                        navigate(1);
                      }
                    : null
                }
                onContextMenu={(ev: unknown): void => {
                  ev.preventDefault();
                  setHeaderMenu("next");
                }}
                to={null}
                style={{
                  backgroundColor: "rgba(45, 45, 45, 0.7)",
                  borderRadius: "1.5rem",
                  display: "inline-block",
                  height: "40px",
                  marginRight: "10px",
                  textAlign: "center",
                  verticalAlign: "middle",
                  width: "40px",
                }}
              >
                <CustomSVG
                  icon="arrow-right"
                  viewBox="0 0 24 24"
                  style={{ height: "18px", padding: "11px 0" }}
                />
              </NavLink>
              {headerMenu === "next" && appHistory.getNext().length > 0 ? (
                <ul ref={nextMenu}>
                  {appHistory.getNext().map((item: object, i: number) => (
                    <li key={i}>
                      <NavLink onClick={() => navigate(i + 1)} to={null}>
                        {item["title"]}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>
          <div style={{ display: "inline-block", height: "40px" }}>
            <form
              action="/search"
              onSubmit={handleSubmitSearch}
              style={{
                height: "100%",
                marginRight: "10px",
                position: "relative",
              }}
            >
              <CustomSVG
                icon="search"
                style={{
                  fill: "transparent",
                  height: "100%",
                  left: "10px",
                  position: "absolute",
                  stroke: "white",
                  strokeWidth: "2px",
                  verticalAlign: "middle",
                  width: "16px",
                }}
                viewBox="0 0 24 24"
              />
              <input
                name="q"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setQuery(e.target.value)
                }
                placeholder="Search"
                style={{
                  backgroundColor: "rgba(45, 45, 45, 0.7)",
                  border: "none",
                  borderRadius: "6px",
                  color: "rgb(253, 253, 253)",
                  fontSize: "13px",
                  height: "38px",
                  paddingLeft: "35px",
                  paddingRight: "10px",
                  verticalAlign: "middle",
                  width: "480px",
                }}
                value={query}
              />
            </form>
          </div>
          <div style={{ display: "inline-block" }}>
            <NavLink
              className="hoverHeaderButtonFill"
              onClick={(ev: unknown): void => {
                ev.preventDefault();
                setHeaderMenu(headerMenu === "upload" ? null : "upload");
              }}
              to={null}
              style={{
                backgroundColor: "rgba(45, 45, 45, 0.7)",
                borderRadius: "1.5rem",
                display: "inline-block",
                height: "40px",
                marginRight: "10px",
                textAlign: "center",
                verticalAlign: "middle",
                width: "40px",
              }}
            >
              <CustomSVG
                icon="publish"
                viewBox="0 0 24 24"
                style={{
                  height: "18px",
                  padding: "11px 0",
                  strokeWidth: "2px",
                }}
              />
            </NavLink>
            {headerMenu === "upload" ? (
              <ul ref={uploadMenu}>
                <li>
                  <NavLink to={null}>
                    <CustomSVG
                      icon="publish"
                      viewBox="0 0 24 24"
                      style={{
                        height: "18px",
                        paddingRight: "4px",
                        stroke: "white",
                        strokeWidth: "2px",
                        verticalAlign: "middle",
                      }}
                    />{" "}
                    <span>Upload</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to={null}>
                    <CustomSVG
                      icon="at"
                      viewBox="0 0 24 24"
                      style={{
                        fill: "transparent",
                        height: "18px",
                        paddingRight: "4px",
                        stroke: "white",
                        strokeWidth: "2px",
                        verticalAlign: "middle",
                      }}
                    />{" "}
                    <span>New Channel</span>
                  </NavLink>
                </li>
              </ul>
            ) : null}
          </div>
          <div style={{ display: "inline-block" }}>
            <NavLink
              className="hoverHeaderButtonFill"
              onClick={(ev: unknown): void => {
                ev.preventDefault();
                setHeaderMenu(headerMenu === "settings" ? null : "settings");
              }}
              to={null}
              style={{
                backgroundColor: "rgba(45, 45, 45, 0.7)",
                borderRadius: "1.5rem",
                display: "inline-block",
                height: "40px",
                marginRight: "10px",
                textAlign: "center",
                verticalAlign: "middle",
                width: "40px",
              }}
            >
              <CustomSVG
                icon="settings"
                viewBox="0 0 24 24"
                style={{
                  height: "18px",
                  padding: "11px 0",
                  fill: "transparent",
                  strokeWidth: "2px",
                }}
              />
            </NavLink>
            {headerMenu === "settings" ? (
              <ul ref={settingsMenu}>
                <li>
                  <NavLink to="/settings">
                    <CustomSVG
                      icon="settings"
                      viewBox="0 0 24 24"
                      style={{
                        fill: "transparent",
                        height: "18px",
                        paddingRight: "4px",
                        stroke: "white",
                        strokeWidth: "2px",
                        verticalAlign: "middle",
                      }}
                    />{" "}
                    <span>Settings</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/help">
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
                    <span>Help</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to={null}>
                    <CustomSVG
                      icon="sun"
                      viewBox="0 0 24 24"
                      style={{
                        fill: "transparent",
                        height: "18px",
                        paddingRight: "4px",
                        stroke: "white",
                        strokeWidth: "2px",
                        verticalAlign: "middle",
                      }}
                    />{" "}
                    <span>Light/Dark</span>
                  </NavLink>
                </li>
                {LBRY.getStaticDaemonRPC() ? null : (
                  <li>
                    <NavLink
                      onClick={(): void => LBRY.setDaemonRPC(null)}
                      to={null}
                    >
                      <CustomSVG
                        icon="inside"
                        viewBox="0 0 24 24"
                        style={{
                          fill: "transparent",
                          height: "18px",
                          paddingRight: "4px",
                          stroke: "white",
                          strokeWidth: "2px",
                          verticalAlign: "middle",
                        }}
                      />{" "}
                      <span>Switch daemons</span>
                    </NavLink>
                  </li>
                )}
              </ul>
            ) : null}
          </div>
        </div>
        <div style={{ justifyContent: "flex-end" }}>
          <Link
            className="hoverHeaderButton"
            style={{
              backgroundColor: "rgba(45, 45, 45, 0.7)",
              borderRadius: "6px",
              display: "inline-block",
              height: "40px",
              margin: "0 10px",
              padding: "0 10px",
              textDecoration: "none",
              verticalAlign: "middle",
            }}
            to="/wallet"
          >
            <CustomSVG
              icon="lbc"
              viewBox="0 0 24 24"
              style={{
                height: "16px",
                padding: "12px 0",
                verticalAlign: "middle",
              }}
            />
            <span
              style={{
                fontSize: "16px",
                fontWeight: "700",
                marginLeft: "6px",
                verticalAlign: "middle",
              }}
            >
              0.10
            </span>
          </Link>
          <div style={{ direction: "rtl", display: "inline-block" }}>
            <Link
              className="hoverHeaderButtonFill"
              onClick={(ev: unknown): void => {
                ev.preventDefault();
                setHeaderMenu(headerMenu === "account" ? null : "account");
              }}
              to={null}
              style={{
                backgroundColor: "rgba(45, 45, 45, 0.7)",
                borderRadius: "1.5rem",
                direction: "initial",
                display: "inline-block",
                height: "40px",
                textAlign: "center",
                verticalAlign: "middle",
                width: "40px",
              }}
            >
              <CustomSVG
                icon="account"
                viewBox="0 0 24 24"
                style={{
                  fill: "transparent",
                  height: "18px",
                  padding: "11px 0",
                  strokeWidth: "2px",
                }}
              />
            </Link>
            {headerMenu === "account" ? (
              <ul ref={accountMenu} style={{ direction: "initial" }}>
                <li>
                  <NavLink to={null}>
                    <CustomSVG
                      icon="publish"
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
                    <span>Uploads</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to={null}>
                    <CustomSVG
                      icon="at"
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
                    <span>Channels</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to={null}>
                    <CustomSVG
                      icon="flask"
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
                    <span>Creator Analytics</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to={null}>
                    <CustomSVG
                      icon="inside"
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
                    <span>Cloud Connect</span>
                  </NavLink>
                </li>
              </ul>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
