import React, { useState } from "react";
import banque from "../../../images/VIE/banque.png";
import internet from "../../../images/VIE/internet.png";
import shake from "../../../images/VIE/poignee-de-main.png";
import sign from "../../../images/VIE/signature.png";
import FormControl from "@mui/material/FormControl";
import goBack from "../../../images/back.png";
import "./informationSection.css";

function checkImgSrc(value) {
  let src = "1";
  if (value === "1") {
    src = sign;
  }
  if (value === "2") {
    src = banque;
  }
  if (value === "3") {
    src = shake;
  }
  if (value === "4") {
    src = internet;
  }
  return src;
}

function checkText(value) {
  let text = "1";
  if (value === "1") {
    text = "N.I.E.";
  }
  if (value === "2") {
    text = "Banque";
  }
  if (value === "3") {
    text = "V.I.E";
  }
  if (value === "4") {
    text = "Internet";
  }
  return text;
}

function Card(props) {
  return (
    <button className="card" onClick={props.onClick} value={props.value}>
      <img className="viePicto" onClick={props.onClick} src={props.picto} alt={props.alt} value={props.value} />
      <p className="cardText">{props.text} </p>
    </button>
  );
}

function FocusCard(props) {
  const value = props.value;
  let src = checkImgSrc(value);
  let text = checkText(value);

  return (
    <div className="focusCard">
      <img src={src} alt={props.alt} className="focusPicto" />
      <p className="cardText">{text}</p>
      <FormControl className="focusButton">
        <button className="focusCardButton">Question 1</button>
        <button className="focusCardButton">Question 2</button>
        <button className="focusCardButton">Question 3</button>
      </FormControl>
      <button className="goBackButton" onClick={props.onClick}>
        <img className="goBack" src={goBack} alt="goBack" />
      </button>
    </div>
  );
}

export function InformationSection(props) {
  const handleChange = (event) => {
    setCardFocus(event.target.value);
  };
  const goBack = (event) => {
    setCardFocus(0);
  };
  
  const [cardFocus, setCardFocus] = useState(0);
  return (
    <div id="part3" className="vieContainer">
      {cardFocus === 0 ? (
        <div id="part3" className="cardContainer">
          <Card picto={sign} onClick={handleChange} value={1} alt="sign" text="N.I.E."/>
          <Card picto={banque} onClick={handleChange} value={2} alt="banque" text="Banque"/>
          <Card picto={shake} onClick={handleChange} value={3} alt="handshake" text="V.I.E."/>
          <Card picto={internet} onClick={handleChange} value={4} alt="internet" text="Internet"/>
        </div>
      ) : (
        <div className="cardContainer">
          <FocusCard value={cardFocus} onClick={goBack} alt="sign"/>
        </div>
      )}
    </div>
  );
}
