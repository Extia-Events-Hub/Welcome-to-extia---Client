import "./scrollerInformation.css";
import { Link } from "react-scroll";


const ScrollerInformation = (props) => {
  return (
    <div className={props.linkDiv+props.sepia}>
      <Link activeClass="active" to={props.to} spy={true} offset={props.offset ? props.offset : 0}>
        <img className={`${props.imgClassName} hoverImg `} src={props.iconO} alt="logo" />
        <div className="navbarText hoverOrange">
          <p >{props.text} </p>
        </div>
      </Link>

    </div>
  );
}
export default ScrollerInformation
