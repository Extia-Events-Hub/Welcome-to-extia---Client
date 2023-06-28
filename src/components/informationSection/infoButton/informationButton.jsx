import { ReactComponent as Help } from '../../../images/icons/Tooltip.svg'
import { ReactComponent as Polygon } from '../../../images/icons/Polygon1.svg'
import { useState } from 'react'
import { t } from 'i18next'
import './informationButton.css'

const InformationButton = (props) => {
  const [isHovering, setIsHovering] = useState(false)

  const handleMouseOver = () => {
    setIsHovering(true)
  }

  const handleMouseOut = () => {
    setIsHovering(false)
  }
  return (
    <div className="informationdiv">
      {isHovering && (
        <div className="modal">
          <div className="speechbubble">{t(props.information)}</div>
          {(() => {
            if (props.direction === 'bottom') {
              return (
                <div>
                  <Polygon className="polygonBottom" />
                </div>
              )
            } else if (props.direction === 'left') {
              return (
                <div>
                  <Polygon className="polygonLeft" />
                </div>
              )
            }
          })()}
        </div>
      )}

      <Help className="help" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} />
    </div>
  )
}
export default InformationButton
