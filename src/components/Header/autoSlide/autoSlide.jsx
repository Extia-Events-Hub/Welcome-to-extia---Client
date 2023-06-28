import { t } from "i18next";
import { useState } from "react";
import { useCookies } from 'react-cookie';

import cookie from "../../../images/cookieW.png";

import "./autoSlide.css";

export function Cookie() {
  const [, setCookie] = useCookies(['GDPRresponse', 'GDPRanalytics', 'GDPRgeoloc']);
  const [nextYear] = useState(new Date(new Date().setFullYear(new Date().getFullYear() + 1)));
  const [cookieAnalytics, setCookieAnalytics] = useState(true);
  const [cookieGeoloc, setCookieGeoloc] = useState(true);

  const handleAcceptSome = () => {
    setCookie('GDPRresponse', true, { MaxAge: nextYear, path: '/' });
    setCookie('GDPRanalytics', cookieAnalytics, { MaxAge: nextYear, path: '/' });
    setCookie('GDPRgeoloc', cookieGeoloc, { MaxAge: nextYear, path: '/' });
  };
  const handleChangeAnalytics = (e) => {
    setCookieAnalytics(e.target.checked)
  };
  const handleChangeGeoloc = (e) => {
    setCookieGeoloc(e.target.checked)
  };

  return (
    <div>
      <div className="chatBot">
        <div className="cookieTextDiv">
          <img className="cookie" src={cookie} alt="img" />
          <div className="cookieExplaination">
            <p className="cookieText">{t("Cookies")}</p>
            <a href="https://www.extia-group.com/cookies" target="_blank" rel="noreferrer" className="link">{t("cookiePolicy")}</a>
          </div>
        </div>
        <div className="cookieButtonDiv">
          <div className="customCookieChoice">
            <p className="cookieChoiceText">{t("essentialCookies")}</p>
            <div className="buttonCookie r" id="buttonCookie-2">
              <input type="checkbox" className="checkbox" checked disabled />
              <div className="knobs"></div>
              <div className="layer"></div>
            </div>
          </div>
          <div className="customCookieChoice">
            <p className="cookieChoiceText">{t("geolocCookies")}</p>
            <div className="buttonCookie r" id="buttonCookie-1">
              <input type="checkbox" className="checkbox" onChange={handleChangeGeoloc} checked={cookieGeoloc} />
              <div className="knobs"></div>
              <div className="layer"></div>
            </div>
          </div>
          <div className="customCookieChoice">
            <p className="cookieChoiceText">{t("analitycsCookies")}</p>
            <div className="buttonCookie r" id="buttonCookie-1">
              <input type="checkbox" className="checkbox" onChange={handleChangeAnalytics} checked={cookieAnalytics} />
              <div className="knobs"></div>
              <div className="layer"></div>
            </div>
          </div>

          <button className="cookieButton" onClick={() => { handleAcceptSome() }}>
            {t("cookiesAccept")}
          </button>
        </div>
      </div>
    </div>
  );
}
