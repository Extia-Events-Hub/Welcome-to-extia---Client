import { useState, useEffect } from "react";
import { t } from "i18next";

import thinking from "../../../images/v2/Header/Navbar/thinking.svg"
import hackathon from "../../../images/v2/Header/Navbar/hackathonOrange.png"
// import sagrada from "../../../images/v2/Header/Navbar/sagrada.svg"
import cityDefaultLogo from "../../../images/default/city.png";


import "./scroller.css";

import ScrollerInformation from "./scrollerInformation/scrollerInformation";

export function Scroller(props) {
  const [mouseOver, setMouseOver] = useState(false);
  const [animated, setAnimated] = useState(false);
  const [needClose, setNeedClose] = useState(false);
  const [alreadyLeaved, setAlreadyLeaved] = useState(false);

  const [cityPicto, setCityPicto] = useState(props.cityDeparture);

  useEffect(() => {
    setCityPicto(props?.cityDeparture);
  }, [props.cityDeparture]);

  function mouseEnter() {
    if(!needClose){
      setAnimated(true);
      setMouseOver(true);
    }
    setAlreadyLeaved(false);
    setNeedClose(true);
  }
  function animationEnd() {
     if(alreadyLeaved){
       setMouseOver(false);
       setAlreadyLeaved(false);
     }
     if(!mouseOver){
       setNeedClose(false);
    }
    setAnimated(false);
  }
  function mouseLeave(){
    if(!animated){
      setMouseOver(false);
    }
    else {
      setAlreadyLeaved(true);
    }
  }
  return (
    <>
      <div className="containerNav" 
            onMouseEnter={mouseEnter}
            onMouseLeave={mouseLeave}
            onAnimationEnd={animationEnd}>
        <div className={'fixedStyleNav '+ ((animated || mouseOver)? 'animated ' : '')+ ( !animated && !mouseOver && needClose ? 'animatedEnd ' : '')} >
          <nav className='navbar' >
            <ScrollerInformation linkDiv={((animated || mouseOver || needClose)? 'linkdiv ' : 'flexdiv ')}
              sepia=" sepia " imgClassName="button" to="Header"  iconO={thinking} text={`${t("navbarPlanning")}`} offset={-80}/>
            <ScrollerInformation linkDiv={((animated || mouseOver || needClose)? 'linkdiv ' : 'flexdiv ')} 
              sepia=" sepia " imgClassName="button" to="weather" iconO={cityPicto?.logo?.url || cityDefaultLogo} text={`${t("navbarAreYou")}${t(props.cityDeparture?.name)}`} offset={-40} />
            <ScrollerInformation linkDiv={((animated || mouseOver || needClose)? 'linkdiv ' : 'flexdiv ')} 
              sepia=" sepia " imgClassName="button" to="weather" iconO={hackathon} text={`Ver widget`} offset={1255} />
          </nav>
        </div>
      </div>
    </>
  );
}
