import { CityButton } from "../../components/Header/cityButton/cityButton";
import { GoDownArrow } from "../../components/Header/goDownArrow/goDownArrow"
import { Cookie } from "../../components/Header/autoSlide/autoSlide";
import { useCookies } from 'react-cookie';
// import { cityArrival } from "../../data/cityName";
import { Scroller } from "../../components/Header/scroller/scroller";
import { t } from "i18next";

import human from "../../images/humans/humanThink.png";

import "./header.css";

const circleStyle = {
  position: "absolute",
  backgroundColor: "#FFE9DD",
  borderRadius: "50%",
  width: "50vmax",
  height: "50vmax",
  opacity: "100%",
  transform: "translate(25%, 25%)",
  right: "0",
  bottom: "0",
  zIndex: -1,
};

const circleStyleM = {
  position: "absolute",
  backgroundColor: "#FFE9DD",
  borderRadius: "50%",
  width: "90vmax",
  height: "90vmax",
  opacity: "100%",
  transform: "translate(25%, 25%)",
  right: "0",
  bottom: "0",
  overflow: "hidden",
  zIndex: -1,
};


const circleStyleS = {
  position: "absolute",
  backgroundColor: "rgb(255, 233, 221)",
  borderRadius: "50%",
  opacity: "1",
  left: "-33vw",
  right: "-33vw",
  top: "-15%",
  bottom: "18vh",
  overflow: "hidden",
  zIndex: "0",
};

const circleStyleLandscape = {
  position: "absolute",
  backgroundColor: "rgb(255, 233, 221)",
  borderRadius: "0",
  opacity: "1",
  left: "0",
  right: "0",
  top: "0",
  bottom: "0",
  overflow: "hidden",
  zIndex: "0",
};


const titleStyle = {
  textAlign: "left",
  fontSize: "6vw",
  fontFamily: "Mont",
  color: "#283D47",
};

const titleStyleMedium = {
  textAlign: "left",
  fontSize: "8vw",
  fontFamily: "Mont",
  color: "#283D47",
};

const titleStyleSmall = {
  textAlign: "center",
  fontSize: "14vmin",
  fontFamily: "Mont",
  color: "#283D47",
  position: "relative",
  zIndex: "1",
};

const titleBcnStyle = {
  textAlign: "center",
  fontWeight: "medium",
  fontSize: "9vw",
  color: "#FC9254",
};

const titleBcnStyleMedium = {
  textAlign: "center",
  fontWeight: "medium",
  fontSize: "11vw",
  color: "#FC9254",
};


const titleBcnStyleSmall = {
  color: "#FC9254",
  fontWeight: "normal",
  fontSize: "23vmin",
  textAlign: "center",
  marginTop: "0px",
  position: "relative",
  zIndex: "1",
};
export function Header(props) {

  const [cookies] = useCookies(['GDPRresponse']);
  var elemStyle = {
  };

  var titleAndCityButtonContainer = {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    left: "calc(8vw + 100px)",
    top: "25%"
  };

  if (props.format === "m") {
    titleAndCityButtonContainer.left = "calc(50% + 50px)";
    titleAndCityButtonContainer.top = "42%";
    titleAndCityButtonContainer.height = "35%";
    titleAndCityButtonContainer.transform = "translate(-50%, -50%)";
  }

  if (props.format === "s") {
    if (props.orientation === "landscape") {
      elemStyle.height = "unset";
      titleAndCityButtonContainer.position = "static";
      titleAndCityButtonContainer.paddingBottom = "32px";
    }
    else {
      titleAndCityButtonContainer.left = "50%";
      titleAndCityButtonContainer.top = "13%";
      titleAndCityButtonContainer.transform = "translateX(-50%)";
    }
  }
  return (
    <>
      <div className="elemStyle" style={elemStyle} name="Header" format={props.format}>
        <div style={props.format === "s" ? props.orientation === "portrait" ? circleStyleS : circleStyleLandscape : props.format === "m" ? circleStyleM : circleStyle}>
          {props.format === 'l' && <img src={human} className="human" alt="human" />}
        </div>
        <div>
          <div style={titleAndCityButtonContainer}>
            <div className="titleFont">
              <span style={props.format === "s" ? titleStyleSmall : props.format === "m" ? titleStyleMedium : titleStyle}>{props.format === "s" ? t("welcome") : t("Welcome to extia")}</span>
              <div className="extiaBarcelona">
                {props.format === "l" && (
                  <span style={titleStyle}>Extia</span>
                )}
                {props.format === "m" && (
                  <span style={titleStyleMedium}>Extia</span>
                )}
                {props.format === "s" && (
                  <span style={titleStyleSmall}>{t("to extia")}</span>
                )}
                {props.format !== "s" && (
                  <span>{' '}</span>
                )}
                <span style={props.format === "s" ? titleBcnStyleSmall : props.format === "m" ? titleBcnStyleMedium : titleBcnStyle} className="bcnFont">
                  {t(props.cityArrival?.name)} !
                </span>
              </div>
            </div>
            <CityButton onChange={props.onChange} cityDeparture={props.cityDeparture}
             cityArrival={props.cityArrival} cities={props.cities} format={props.format} />
          </div>
          {props.format !== "s" && (
            <>
              <Scroller cityDeparture={props.cityDeparture} />

            </>
          )}
            {!cookies.GDPRresponse && <Cookie />}
            {cookies.GDPRresponse === "false" && <Cookie />}
        </div>
      </div>
      {(props.format === "s" && props.orientation === "portrait") && <GoDownArrow format={props.format} />}
    </>
  );
}
