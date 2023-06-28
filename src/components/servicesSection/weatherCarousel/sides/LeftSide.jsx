import { t } from 'i18next'
import cityDefaultLogo from '../../../../images/default/city.png'
import './sides.css'
import { LoadingWrapper } from '../../../loadingWrapper/loadingWrapper'

const LeftSide = (props) => {
  return (
    <div className="leftSide">
      <img className="pictoCity" src={props.cityDeparture?.logo?.url || cityDefaultLogo} alt="city" />
      <div className="cityInfo">
        <span className="cityText">{props.cityDeparture?.code}</span>
        <LoadingWrapper isLoading={!props?.cityDeparture?.temperature} height={10} width={40} wrapperClass={'dyText'}>
          <span className="dyText">
            {props.value === 2
              ? props?.cityDeparture?.temperature?.weatherMedium
              : props.value === 1
              ? props?.cityDeparture?.temperature?.weatherCold
              : props?.cityDeparture?.temperature?.weatherHot}
            {' ' + t('days/year')}
          </span>
        </LoadingWrapper>
      </div>
    </div>
  )
}

export default LeftSide
