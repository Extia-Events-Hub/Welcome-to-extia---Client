import { t } from 'i18next'

import './travelTimeComponent.css'

export default function CityItemMenu(props) {
  return (
    <div className="cityItemMenu">
      {props.picture ? (
        <img src={props.picture} width={30} height={30} alt="iconTravelTime" />
      ) : (
        <div className="emptyPictureItem" />
      )}
      <p className="cityItemText">{t(props.name)}</p>
    </div>
  )
}
