import React, { useState } from "react";
import mapTravel from "../../images/map/MapVierge.png";

import mapCouple from "../../images/map/MapCouple.png";
import mapSolo from "../../images/map/MapJeune.png";
import mapFamily from "../../images/map/MapFamille.png";

import couple from "../../images/lifeStyle/couple.png";
import family from "../../images/lifeStyle/famille.png";
import roommate from "../../images/lifeStyle/coloc.png";

import { t } from "i18next";

import "./mapPrice.css";

const displayDiv = {
  display: "flex",
};

const hideDiv = {
  display: "none",
};

const idealista = "https://www.idealista.com/fr/";
const idealista1 = "https://www.idealista.com/fr/venta-viviendas/barcelona/eixample/";
const idealista2 = "https://www.idealista.com/fr/venta-viviendas/barcelona/ciutat-vella/el-raval/";
const idealista3 = "https://www.idealista.com/fr/venta-viviendas/barcelona/gracia/";

const badi =
  "https://badi.com/s/Barcelona--Spain?et-search-sorting=relevance&bounds=41.4682974272428%2C2.22804492421789%3B41.31703848925413%2C2.052333262952554&center=41.3873974%2C2.168568&d=11&pid=ChIJ5TCOcRaYpBIRCmZHTz37sEQ&z=12";
const badi1 = "https://www.idealista.com/fr/venta-viviendas/barcelona/eixample/";
const badi2 = "https://www.idealista.com/fr/venta-viviendas/barcelona/ciutat-vella/el-raval/";
const badi3 = "https://www.idealista.com/fr/venta-viviendas/barcelona/gracia/";

const roommateTab = [t("typic"), t("dynamic"), t("touristic"), t("international"), t("loud"), t("party")];
const soloTab = [t("central"), t("commercial"), t("agreable"), t("others"), t("others"), t("others")];
const coupleTab = [t("calm"), t("residential"), t("space"), t("nature"), t("others"), t("others")];

function BtnGroup(props) {
  return (
    <div className="buttonDiv">
      <button onClick={props.onClick} className="lifeStyleButton" id="solo" value={1}>
        <p className="lifeStyleText">{t("alone")}</p>
      </button>
      <button onClick={props.onClick} className="lifeStyleButton" id="roommate" value={2}>
        <p className="lifeStyleText">Roommate</p>
      </button>
      <button onClick={props.onClick} className="lifeStyleButton" id="couple" value={3}>
        <p className="lifeStyleText">Couple</p>
      </button>
    </div>
  );
}

function InitComponent(props) {
  return (
    <div className="initContainer">
      <div>
        <img src={mapTravel} alt="map" className="mapBarcaPrice" />
      </div>
      <BtnGroup onClick={props.onClick} />
    </div>
  );
}

function Card(props) {
  return (
    <div className="insideText">
      <p className="textCard">{props.text}</p>
    </div>
  );
}

function BackArrowButton(props) {
  const handleChange = props.handleChange;
  return <button type="submit" onClick={handleChange} className="backArrowButtonStyle" value={0}></button>;
}

function LifeStyle(props) {
  return (
    <div style={props.show ? displayDiv : hideDiv}>
      <div className="initContainer">
        <img src={props.map} alt="map" className="mapBarcaPrice2" />
        <div className="neighbourhood">
          <p className="lifeStyleType">{props.type}</p>
          <img src={props.picto} className="pictoLifeStyle" alt="pictoLifeStyle" />
          <div>
            <Card text={props.moodType[0]} />
            <Card text={props.moodType[1]} />
            <Card text={props.moodType[2]} />
            <Card text={props.moodType[3]} />
            <Card text={props.moodType[4]} />
            <Card text={props.moodType[5]} />
          </div>
          <BackArrowButton handleChange={props.onClick} />
        </div>
      </div>
    </div>
  );
}

export function MapPrice(props) {
  const [lifeStyle, setLifeStyle] = useState("0");
  const [idealistaLink, setIdealistaLink] = useState(idealista);
  const [badiLink, setBadiLink] = useState(badi);

  const handleSelectChange = (e) => {
    setLifeStyle(e.target.value);
    setIdealistaLink(
      e.target.value === "0"
        ? idealista
        : e.target.value === "1"
        ? idealista1
        : e.target.value === "2"
        ? idealista2
        : idealista3
    );
    setBadiLink(
      e.target.value === "0" ? badi : e.target.value === "1" ? badi1 : e.target.value === "2" ? badi2 : badi3
    );
  };

  return (
    <div className="mapContainer" id="part2">
      {lifeStyle === "0" ? (
        <InitComponent onClick={handleSelectChange} show={lifeStyle === "0" ? true : false} />
      ) : null}
      <LifeStyle
        map={mapCouple}
        picto={couple}
        type={t("alone")}
        moodType={soloTab}
        onClick={handleSelectChange}
        show={lifeStyle === "1" ? true : false}
      />
      <LifeStyle
        map={mapSolo}
        picto={roommate}
        type={t("roommate")}
        moodType={roommateTab}
        onClick={handleSelectChange}
        show={lifeStyle === "2" ? true : false}
      />
      <LifeStyle
        map={mapFamily}
        picto={family}
        type={t("couple")}
        moodType={coupleTab}
        onClick={handleSelectChange}
        show={lifeStyle === "3" ? true : false}
      />
      <div className="formRentAppart">
        <button className="rentAppart" id="idealista" onClick={() => window.open(idealistaLink, "_blank")}>
          <iframe src={idealistaLink} title="idealista" width="500px" height="500px"></iframe> {/* ICI */}
        </button>
        <button className="rentAppart" id="kasaz" onClick={() => window.open(badiLink, "_blank")}>
          <iframe src={badiLink} title="kasaz" width="500px" height="500px"></iframe> {/* ICI ne pas s'occuper de kasaz on va changer de lien/boite d'immobilier */}
        </button>
        <button className="rentAppart" id="badi" onClick={() => window.open(badiLink, "_blank")}>
          <iframe src={badiLink} title="badi" width="500px" height="500px"></iframe> {/* ICI */}
        </button>
      </div>
    </div>
  );
}
