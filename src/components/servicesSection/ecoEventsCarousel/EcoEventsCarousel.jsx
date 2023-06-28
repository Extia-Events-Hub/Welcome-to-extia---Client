import { useEffect, useState } from 'react'
import './ecoEventsCarousel.css'
import { createEventAdapter } from '../../../adapters/event.adapter'
import { eventService } from '../../../services/event.service'
import { EventCard } from '../eventCard/EventCard'
import { useTranslation } from 'react-i18next'

export function EcoEventsCarousel(props) {
  const format = props.format
  const [events, setEvents] = useState([])

  switch (format) {
    case 's':
      break
    case 'm':
      break
    case 'l':
      break
    default:
      break
  }
  const getEvents = async () => {
    const { data } = await eventService.index()
    const eventsAdapted = await data?.data?.map((event) => {
      return createEventAdapter(event, props.lng.toLowerCase())
    })
    setEvents(eventsAdapted?.slice(0, 6))
  }

  useEffect(() => {
    getEvents()
  }, [props.lng])

  const handleButtonClick = (url) => {
    window.open(url, '_blank')
  }

  const [t, i18] = useTranslation()

  return (
    <div>
      {props?.lng === 'es' && (
        <h2 className="title_section_carousel">
          Haz <span className="accent_title">match </span> con gente como tú
        </h2>
      )}
      {props?.lng != 'es' && <h2 className="title_section_carousel">{t('machWithPeople')}</h2>}

      {events.length === 0 ? (
        <p>Loading events...</p>
      ) : (
        <div className="container">
          {events.map((event) => (
            <EventCard event={event} t={props.t} />
          ))}
        </div>
      )}
      <div className="circlecarousel" />
    </div>
  )
}
