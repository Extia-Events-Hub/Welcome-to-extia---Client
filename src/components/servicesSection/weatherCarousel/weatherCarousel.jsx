import { t } from "i18next";
import { useState } from "react";

import Middle from "./sides/Middle";
import LeftSide from "./sides/LeftSide";
import RightSide from "./sides/RightSide";
import "./weatherCarousel.css";
import InformationButton from "../../informationSection/infoButton/informationButton";

const WeatherCarousel = (props) => {
  const [value, setValue] = useState(2);
  return (
    <div className="boxWeatherCarousel">
      <div className="header">
        <span className="comparisonTitle">
          {t("weather comparison")}
        </span>
        <InformationButton information={"meteoDataFrom"} direction="bottom"/>
        
      </div>
      {props.format !== 's' && <Middle setValue={setValue} />}
      <div className="weatherCarousel">
        <LeftSide cityDeparture={props.cityDeparture} value={value} />
        {props.format === 's' && <div className="line"></div>}
        <RightSide value={value} cityArrival={props.cityArrival} />
      </div>
      {props.format === 's' &&
        <div className="btnCarousel">
          <Middle setValue={setValue} />
        </div>
      }
    </div>
  );
};

export default WeatherCarousel;
