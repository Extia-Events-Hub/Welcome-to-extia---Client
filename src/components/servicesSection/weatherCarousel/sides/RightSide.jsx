import { t } from 'i18next'

// import sagradaPicto from "../../../../images/city/sagrada.png";
// import { cityArrival } from "../../../../data/cityName";

import './sides.css'
import cityDefaultLogo from '../../../../images/default/city.png'
import { LoadingWrapper } from '../../../loadingWrapper/loadingWrapper'

const RightSide = (props) => {
  const cityArrival = props.cityArrival

  let mainCityDays = []
  // if(cityArrival.temperature){

  mainCityDays = [
    cityArrival?.temperature?.weatherCold,
    cityArrival?.temperature?.weatherMedium,
    cityArrival?.temperature?.weatherHot,
  ]
  // }

  return (
    <div className="rightSide">
      <div className="cityInfo">
        <span className="cityText">{cityArrival?.code}</span>
        <LoadingWrapper isLoading={!cityArrival?.temperature} wrapperClass={'dyText'}>
          <span className="dyText">{mainCityDays[props.value - 1] + ' ' + t('days/year')} </span>
        </LoadingWrapper>
      </div>
      <img className="pictoCity" src={props.cityArrival?.logo?.url || cityDefaultLogo} alt="city" />
    </div>
  )
}

export default RightSide
