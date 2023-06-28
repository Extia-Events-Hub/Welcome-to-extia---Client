import React, { useState, useEffect } from "react";
import { Link } from "react-scroll";
import "./topSectionText.css";
import { t } from "i18next";

const text = {
  position: "relative",
  display: "flex",
  fontSize: "200%",
  color: "#283D47",
  marginBottom: "2%",
};

const textOnline = {
  position: "relative",
  display: "flex",
  fontSize: "200%",
  color: "#283D47",
  fontWeight: "bold",
  marginBottom: "2%",
};

const textSmall = {
  position: "relative",
  display: "flex",
  textAlign: 'center',
  fontSize: "120%",
  lineHeight: "1.3",
  color: "#283D47",
  marginBottom: "1%",
};

const textOnlineSmall = {
  position: "relative",
  display: "flex",
  textAlign: "center",
  fontSize: "120%",
  lineHeight: "1.3",
  color: "#283D47",
  fontWeight: "bold",
  marginBottom: "1%",
};

export function TopSectionText(props) {
  
/*   let design1,
    design2,
    design3,
    design4 = text; */

  const [time, setTime] = useState(0);
  useEffect(() => {
    setTimeout(() => setTime(time + 1), 2800);
    return () => clearTimeout(time);
  }, [time]);
  return (
    <div className="textBox">
    </div>
  );
}
