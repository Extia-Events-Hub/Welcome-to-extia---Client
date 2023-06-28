import { SelectLangue } from "../../components/Header/selectLangue/selectLangue";
import extiaLogo from "../../images/Extiaorangeblanc.svg";
import extiaLogoWhite from "../../images/Extialogoblanc.svg";
import { Link } from "react-scroll";

// import hackathon from "../../images/v2/Header/Navbar/hackathonWhite.png";
import { useEffect, useState } from "react";
import { t } from "i18next";
import "./stickyHeader.scss";
export const StickyHeader = (props) => {
  const stickyNav = {
    height: "80px",
    position: "sticky",
    top: "0",
    left: "0",
    right: "0",
    zIndex: "10",
    backgroundColor: props.format === "s" ? "rgb(255, 233, 221)" : "#ffffff",
    transition: "all 200ms ease-in-out 0ms",
  };

  const stickyNavScrolled = {
    backgroundColor: "rgba(252,146,84, 0.85)",
    backdropFilter: "blur(5px)",
    boxShadow: "-3px 10px 25px rgba(0, 0, 0, 0.25)",
  };

  const extiaLogoContainerStyle = {
    position: "absolute",
    height: "100%",
    top: "0",
    left: props.format === "s" ? "18px" : "calc(2vw + 26px)",
    display: "flex",
    alignItems: "center",
  };

  const extiaLogoStyle = (white) => {
    return {
      borderRadius: "50%",
      boxShadow: "-3px 10px 25px rgba(0, 0, 0, 0.1)",
      height: "60%",
      opacity: isScrolled ^ !white ? "100%" : "0",
      display: isScrolled ^ !white ? "block" : "none",
    };
  };

  const [isScrolled, setIsScrolled] = useState(window.scrollY !== 0);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setIsScrolled(window.scrollY !== 0);
    });
  }, []);

  return (
    <div
      style={isScrolled ? { ...stickyNav, ...stickyNavScrolled } : stickyNav}
    >
      <Link to="Header" style={extiaLogoContainerStyle}>
        <img
          src={extiaLogoWhite}
          alt="extia-logo"
          style={extiaLogoStyle(true)}
        />
        <img src={extiaLogo} alt="extia-logo" style={extiaLogoStyle(false)} />
      </Link>
      <SelectLangue onClick={props.lngChange} isWhite={isScrolled} />
    </div>
  );
};
