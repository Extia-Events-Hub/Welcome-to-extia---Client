import arrow from "../../../images/down-arrow.png";
import whiteArrow from "../../../images/down-arrow-white.png";
import { Link } from "react-scroll";
import "./goDownArrow.css";

// General scroll to element function

export const GoDownArrow = (props) => {
  return (
    <Link className="arrowImg" activeClass="active" to="weather" spy={true} offset={-50}>
      <img style={props.format === "l" ? {width: "74px"} : {width: "64px"}} src={props.format !== "s" ? arrow : whiteArrow} alt="img"/>
    </Link>
  );
};
