import moment from 'moment'

export const createEventAdapter = (event, language) => ({
  id: event.id,
  title: typeof event?.title === 'string' ? JSON.parse(event?.title)?.[language] : event?.title[language],
  shortDescription:
    typeof event?.shortDescription === 'string'
      ? JSON.parse(event?.shortDescription)?.[language]
      : event?.shortDescription[language],
  longDescription:
    typeof event?.longDescription === 'string'
      ? JSON.parse(event?.longDescription)?.[language]
      : event?.longDescription[language],
  isPresential:
    typeof event?.mode === 'string'
      ? JSON.parse(event?.mode)?.[language]?.isPresential
      : JSON.parse(event?.mode?.[language]?.isPresential),
  location:
    typeof event?.mode === 'string' ? JSON.parse(event?.mode)?.[language]?.location : event?.mode?.[language]?.location,
  startDate: moment(event?.startDate).format('DD-MMM-YY'),
  endDate: moment(event?.endDate).format('DD-MMM-YY'),
  startTime: moment(event?.startTime, 'HH:mm:ss').format('HH:mm'),
  endTime: moment(event?.endTime, 'HH:mm:ss').format('HH:mm'),
  max_participants: event?.max_participants,
  image: event?.image,
})
