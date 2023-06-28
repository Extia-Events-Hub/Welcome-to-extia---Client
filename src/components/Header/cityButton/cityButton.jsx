import { useState, useEffect } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
// import { cityData, cityArrival } from "../../../data/cityName";
// import { cityArrival } from "../../../data/cityName";
// import sagradaPicto from "../../../images/city/orange/barcelone.png";

import cityDefaultLogo_o from "../../../images/default/city_o.png";

import { t } from "i18next";
import "./cityButton.css";

const boxStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderRadius: "50px",
  opacity: "0.9",
  fontSize: "160%",
  border: "2px solid #EFEFEF",
  backgroundColor: "white",
  height: "100px",
  width: "550px",
  boxShadow: "-3px 10px 25px rgba(0, 0, 0, 0.1)",
};

const boxStyleSmall = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderRadius: "50px",
  opacity: "0.9",
  fontSize: "min(120%, 4vw)",
  border: "1px solid #EFEFEF",
  backgroundColor: "white",
  height: "60px",
  width: "80vw",
  boxShadow: "-3px 5px 10px rgba(0, 0, 0, 0.1)",
  zIndex: "1",
  marginLeft: "auto",
  marginRight: "auto",
};

const selectStyle = {
  height: "60px",
  borderRadius: "50px",
  backgroundColor: "white",
  fontSize: "1OO%",
  width: "275px",
  marginLeft: "10px",
  color: "transparent",
  borderColor: "transparent",
};

const selectStyleSmall = {
  height: "45px",
  borderRadius: "50px",
  backgroundColor: "white",
  fontSize: "1OO%",
  width: "50%",
  minWidth: "50%",
  marginLeft: "5px",
  color: "#FC9254",
};

const cityNameDepartureStyle = {
  fontSize: "100%",
  color: "#FC9254",
  margin: "auto",
};

const cityNameArrivalStyle = {
  color: "#FC9254",
  fontSize: "100%",
  margin: "auto",
};

const logoStyle = {
  maxWidth: "60px",
  maxHeight: "60px",
  verticalAlign: "middle",
};

const logoStyleSmall = {
  maxWidth: "min(28px, 6vw)",
  maxHeight: "min(28px, 6vw)",
  verticalAlign: "middle",
};

const logoStyleSmallParis = {
  maxWidth: "min(28px, 6vw)",
  maxHeight: "min(28px, 6vw)",
  verticalAlign: "middle",
  marginRight: "5px",
};
export function CityButton(props) {

  function selectCity(cityData) {
    setCity(cityData);
  }

  const [city, setCity] = useState(props.cityDeparture);
  const [open, setOpen] = useState(false);

  var buttonStyle = {
    position: "relative",
    borderColor: "transparent",
    alignItems: "center",
    fontFamily: "Mont, bold",
    lineHeight: "1",
  };

  function CityItemSelector(props) {
    return (
      <div
        className="cityItemMenuHeader"
        onClick={() => selectCity(props.cities)}
      >
        <p className="cityItemTextHeader">{t(props.cities?.name)}</p>
        {/* {props.cities?.logo_o?.url ? ( */}
          <img
            src={props.cities?.logo_o?.url || cityDefaultLogo_o}
            style={
              props.cities.name === "Paris"
                ? logoStyleSmallParis
                : logoStyleSmall
            }
            alt="iconTravelTime"
          />
        {/* ) : (
          <div className="emptyPictureItemHeader" />
        )} */}
      </div>
    );
  }

  useEffect(() => {
    props.onChange(city);
  }, [props, city]);

  useEffect(() => {
    selectCity(props.cityDeparture);
  }, [props.cityDeparture])

  let cityNameTab = props.cities.map((element) => {
    return (
      <MenuItem key={element.name}>
        {element.name !== props.cityArrival?.name && 
          <CityItemSelector cities={element} />
        }
      </MenuItem>
    );
  });

  return (
    <FormControl style={buttonStyle} format={props.format}>
      <Box
        format={props.format}
        style={props.format === "s" ? boxStyleSmall : boxStyle}
      >
        <Select
          value={""}
          style={props.format === "s" ? selectStyleSmall : selectStyle}
          sx={{ m: 1, minWidth: 200 }}
          open={open}
          onClose={() => setOpen(false)}
          onClick={() => setOpen(!open)}
        >
          {cityNameTab}
        </Select>
        <div
          className="elementSelected"
          format={props.format}
          onClick={() => setOpen(!open)}
        >
          <img
            src={city?.logo_o?.url || cityDefaultLogo_o}
            alt="logo"
            style={props.format === "s" ? logoStyleSmall : logoStyle}
          />
          <div className="nameAndCode">
            <span style={cityNameDepartureStyle}>{t(city?.name)}</span>
          </div>
          
        </div>

        <div className="separatorStyle"></div>
        <div className="elementArrival" format={props.format}>
          <img
            style={props.format === "s" ? logoStyleSmall : logoStyle}
            src={props.cityArrival?.logo_o?.url || cityDefaultLogo_o} 
            alt="logo"
          />
          <div className="nameAndCode">
            <span style={cityNameArrivalStyle}>{t(props.cityArrival?.name)}</span>
          </div>
        </div>
      </Box>
    </FormControl>
  );
}
