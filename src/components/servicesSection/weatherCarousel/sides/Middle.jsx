import { t } from "i18next";
import { useState } from "react";

import cloudy from "../../../../images/carousel/sun.png";
import sunny from "../../../../images/carousel/sunny.png";
import snowMan from "../../../../images/carousel/snowMan.png";
import sunActive from "../../../../images/carousel/sunButton.png";
import snowActive from "../../../../images/carousel/snowButton.png";
import cloudActive from "../../../../images/carousel/cloudButton.png";

import "./Middle.css"

const Middle = (props) => {
  const [snow, setSnow] = useState({ src: snowMan, className: "unselected" });
  const [cloud, setCloud] = useState({ src: cloudActive, className: "selected" });
  const [sun, setSun] = useState({ src: sunny, className: "unselected" });
  const [weather, setWeather] = useState(t("weather5-25"));

  const handleChange = (event) => {
    // eslint-disable-next-line
    if (event.target.getAttribute("value") == 1) {
      setSnow({ src: snowActive, className: "selected" });
      setCloud({ src: cloudy, className: "unselected" });
      setSun({ src: sunny, className: "unselected" });
      setWeather(t("weather<5"));
      props.setValue(1);
      // eslint-disable-next-line
    } else if (event.target.getAttribute("value") == 2) {
      setSnow({ src: snowMan, className: "unselected" });
      setCloud({ src: cloudActive, className: "selected" });
      setSun({ src: sunny, className: "unselected" });
      setWeather(t("weather5-25"));
      props.setValue(2);
      // eslint-disable-next-line
    } else if (event.target.getAttribute("value") == 3) {
      setSnow({ src: snowMan, className: "unselected" });
      setCloud({ src: cloudy, className: "unselected" });
      setSun({ src: sunActive, className: "selected" });
      setWeather(t("weather>25"));
      props.setValue(3);
    }
  }

  return (
    <div className="middleside">
      <span className="weatherText">{weather}</span>
      <div className="carousel">
        <div className={`btn${sun.className}`} onClick={handleChange}>
          <img className={sun.className} alt="weatherPicto" src={sun.src} value={3} />
        </div>
        <div className={`btn${cloud.className}`} onClick={handleChange}>
          <img className={cloud.className} alt="weatherPicto" src={cloud.src} value={2} />
        </div>
        <div className={`btn${snow.className}`} onClick={handleChange}>
          <img className={snow.className} alt="weatherPicto" src={snow.src} value={1} />
        </div>
      </div>
    </div>
  )
}

export default Middle;