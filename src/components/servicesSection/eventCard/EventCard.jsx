import React from 'react'
import { useTranslation } from 'react-i18next'

export function EventCard({ event, className, lng }) {

    const [t,i18] = useTranslation()
  const locationEvent = event?.isPresential === true ? event?.location : 'online event'

  return (
    <div className="card" key={event?.id}>
      <img alt={event?.image} src={event?.image} className="image_card" />
      <div className="card_details">
        <h3>{event?.title > 25 ? event?.title?.slice(0, 40) + '...' : event?.title}</h3>
        <p className="card_date">
          {event?.startDate} / {event?.startTime}{' '}
        </p>
        <p className="card_location">{event && locationEvent}</p>
        <a className="button_card_carousel" href={`https://extia-events-hub-client-nine.vercel.app/#/events/${event.id}`} target='_blank'>
          {t("viewEvent")}
        </a>
      </div>
    </div>
  )
}
