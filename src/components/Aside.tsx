import React, { JSX } from "react";
import { Link, Location, NavLink, useLocation } from "react-router";
import CustomSVG from "~/components/CustomSVG";
import Footer from "~/components/Footer";

function Aside({ open }): JSX.Element {
  const location: Location = useLocation();

  return (
    <aside className={open ? "menu-open" : undefined}>
      <nav>
        <ul
          className="links"
          style={{ listStyle: "none", margin: 0, padding: 0 }}
        >
          <li className={location.pathname === "/" ? "item-focus" : undefined}>
            <NavLink
              style={{
                display: "inline-block",
                textDecoration: "none",
                width: "100%",
              }}
              to="/"
            >
              <CustomSVG
                style={{
                  height: "16",
                  width: "16",
                  verticalAlign: "middle",
                  strokeWidth: "2px",
                  padding: open ? "0px 8px 0px 12px" : null,
                }}
                icon="home"
                viewBox="0 0 24 24"
              />
              <span style={{ verticalAlign: "middle" }}>Home</span>
            </NavLink>
          </li>
          <li
            className={
              location.pathname === "/following" ? "item-focus" : undefined
            }
          >
            <NavLink
              style={{
                display: "inline-block",
                textDecoration: "none",
                width: "100%",
              }}
              to="/following"
            >
              <CustomSVG
                style={{
                  height: "16",
                  width: "16",
                  verticalAlign: "middle",
                  strokeWidth: "2px",
                  padding: open ? "0px 8px 0px 12px" : null,
                }}
                icon="heart"
                viewBox="0 0 24 24"
              />
              <span style={{ verticalAlign: "middle" }}>Following</span>
            </NavLink>
          </li>
          <li
            className={location.pathname === "/tags" ? "item-focus" : undefined}
          >
            <NavLink
              style={{
                display: "inline-block",
                textDecoration: "none",
                width: "100%",
              }}
              to="/tags"
            >
              <CustomSVG
                style={{
                  height: "16",
                  width: "16",
                  verticalAlign: "middle",
                  strokeWidth: "2px",
                  padding: open ? "0px 8px 0px 12px" : null,
                }}
                icon="tag"
                viewBox="0 0 24 24"
              />
              <span style={{ verticalAlign: "middle" }}>Your Tags</span>
            </NavLink>
          </li>
          <li
            className={
              location.pathname === "/discover" ? "item-focus" : undefined
            }
          >
            <NavLink
              style={{
                display: "inline-block",
                textDecoration: "none",
                width: "100%",
              }}
              to="/discover"
            >
              <CustomSVG
                style={{
                  height: "16",
                  width: "16",
                  verticalAlign: "middle",
                  strokeWidth: "2px",
                  padding: open ? "0px 8px 0px 12px" : null,
                }}
                icon="compass"
                viewBox="0 0 24 24"
              />
              <span style={{ verticalAlign: "middle" }}>Discover</span>
            </NavLink>
          </li>
          <li
            className={
              location.pathname === "/library" ? "item-focus" : undefined
            }
          >
            <NavLink
              style={{
                display: "inline-block",
                textDecoration: "none",
                width: "100%",
              }}
              to="/library"
            >
              <CustomSVG
                style={{
                  height: "16",
                  width: "16",
                  verticalAlign: "middle",
                  strokeWidth: "2px",
                  padding: open ? "0px 8px 0px 12px" : null,
                }}
                icon="key"
                viewBox="0 0 24 24"
              />
              <span style={{ verticalAlign: "middle" }}>Library</span>
            </NavLink>
          </li>
          <li
            className={
              location.pathname === "/lists" ? "item-focus" : undefined
            }
          >
            <NavLink
              style={{
                display: "inline-block",
                textDecoration: "none",
                width: "100%",
              }}
              to="/lists"
            >
              <CustomSVG
                style={{
                  height: "16",
                  width: "16",
                  verticalAlign: "middle",
                  strokeWidth: "2px",
                  padding: open ? "0px 8px 0px 12px" : null,
                }}
                icon="stack"
                viewBox="0 0 24 24"
              />
              <span style={{ verticalAlign: "middle" }}>Lists</span>
            </NavLink>
          </li>
        </ul>
        {open ? (
          <>
            <ul className="generic">
              <li>
                <Link to="https://lbry.org/about">About</Link>
              </li>
              <li>
                <Link to="https://lbry.org/faq">FAQ</Link>
              </li>
              <li>
                <Link to="https://lbry.org/support">Support</Link>
              </li>
              <li>
                <Link to="https://lbry.org/terms">Terms</Link>
              </li>
              <li>
                <Link to="https://lbry.org/privacy">Privacy Policy</Link>
              </li>
            </ul>
          </>
        ) : null}
      </nav>
      {open ? <Footer /> : null}
    </aside>
  );
}

export default Aside;
