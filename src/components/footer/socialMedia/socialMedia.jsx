import instagram from "../../../images/media/Insta.png";
import linkedin from "../../../images/media/In.png";
import comet from "../../../images/media/Comet.png";
import placeToWork from "../../../images/media/greatPlacetowork.png";
import { useState } from "react";
import { useCookies } from 'react-cookie';
import greatplaceToWork from "../../../images/media/GreatPlaceWork.png";
import "./socialMedia.css";
import { t } from "i18next";

function UpSide(props) {
  return (
    <div className="logoTopContainer">
      <a
        className="link"
        target={"_blank"}
        href="https://www.instagram.com/extia_espana/"
        rel="noreferrer"
        style={{ borderRadius: "50%", boxShadow: "-3px 10px 25px rgba(0, 0, 0, 0.25)" }}
      >
        <img alt="instagram" className="mediaPictoFixed" src={instagram} />
      </a>
      <a
        className="link"
        target={"_blank"}
        href="https://www.linkedin.com/company/extia/"
        rel="noreferrer"
        style={{ borderRadius: "50%", boxShadow: "-3px 10px 25px rgba(0, 0, 0, 0.25)" }}
      >
        <img alt="linkedin" className="mediaPictoFixed" src={linkedin} />
      </a>
    </div>
  );
}

function LeftSide(props) {
  const [, setCookie] = useCookies(['GDPRresponse']);
  const [nextYear] = useState(new Date(new Date().setFullYear(new Date().getFullYear() + 1)));
  const handleclick = () => {
    setCookie('GDPRresponse', false,{MaxAge: nextYear, path: '/'});
  };
  return (
    <div style={props.format !== 's' ? { width: "25%" } : {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "center"
    }}>
      <p className="text">
        <a
          target={"_blank"}
          className="basicLink"
          href={`https://www.extia-group.com/es-${props.lng}/about-us`}
          rel="noreferrer"
        >
          {t("who are we")}
        </a>
      </p>
      <p className="text">
        <a
          target={"_blank"}
          className="basicLink"
          href={`https://www.extia-group.com/es-${props.lng}/join-us`}
          rel="noreferrer"
        >
          {t("join us")}
        </a>
      </p>
      <p className="text">
        <a
          target={"_blank"}
          className="basicLink"
          href={`https://www.extia-group.com/es-${props.lng}/expertise`}
          rel="noreferrer"
        >
          {t("our expertise")}
        </a>
      </p>
      <p className="text clickable" onClick={handleclick}>
          {t("myCookies")}
      </p>
    </div>
  );
}

function MiddleSide(props) {
  return (
    <div
      style={{
        width: `${props.format !== 's' ? "25%" : ""}`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: `${props.format === 's' ? "center" : ""}`,
      }}
    >
      {props.format !== 's' ?
        <p className="text" style={{ marginBottom: "30px" }}>
          <a
            target={"_blank"}
            className="basicLink"
            href={`https://www.extia-group.com/es-${props.lng}/inside-extia`}
            rel="noreferrer"
          >
            {t("inside Extia")}
          </a>
        </p>
        :
        <p className="text" id="contact">
          <a
            target={"_blank"}
            className="basicLink"
            href={`https://www.extia-group.com/es-${props.lng}/contact`}
            rel="noreferrer"
          >
            {t("contact us")}
          </a>
        </p>}
      <a
        target={"_blank"}
        className="basicLink"
        href={`https://www.extia-group.com/es-${props.lng}/comet`}
        rel="noreferrer"
        style={props.format === 's' ? { marginLeft: "70px", marginTop: "20px" } : {}}
      >
        <img alt="mediaCologoTopContainermet" style={{ width: `${props.format !== 's' ? "80%" : "70%"}` }} src={comet} />
      </a>
     
    </div>
  );
}

function RightSide(props) {
  return (
    <div style={{ width: `${props.format !== 's' ? "25%" : ""}` }} className="right-container">
      {props.format !== 's' && <p className="text" id="contact">
        <a
          target={"_blank"}
          className="basicLink"
          href={`https://www.extia-group.com/es-${props.lng}/contact`}
          rel="noreferrer"
        >
          {t("contact us")}
        </a>
      </p>}
      <div className="img">
        <img alt="placeToWork" style={props.format !== 's' ? { width: "45%" } : { width: "30%", marginLeft: "55px" }} src={placeToWork} />
        <img
          alt="greatplaceToWork"
          style={props.format !== 's' ? { width: "47%", marginLeft: "50px" } : { width: "32%", marginLeft: "30px" }}
          src={greatplaceToWork}
        />
      </div>
    </div>
  );
}

const DownSide = (props) => {
  return (
    <>
      {props.format === 's' && <div style={{ marginTop: "100px" }} />}
    </>
  );
};


export function SocialMedia(props) {
  let footerStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingLeft: "10%",
    paddingRight: "10%",
    minWidth: "310px",
    height: "330px"
  };

  if (props.format === 's')
    footerStyle = {
      ...footerStyle,
      flexDirection: "column",
      alignItems: "center",
    }

  return (
    <div className="footer">
      <UpSide lng={props.lng} />
      <div style={{ paddingTop: "50px" }} />
      <div
        style={footerStyle}
      >
        <LeftSide lng={props.lng} format={props.format} />
        <div className="line" />
        <MiddleSide lng={props.lng} format={props.format} />
        <div className="line" />
        <RightSide lng={props.lng} format={props.format} />
      </div>
      <DownSide format={props.format} />
    </div>
  );
}
