import { useState, useEffect } from 'react'
import { init, t } from 'i18next'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

import { selectImages } from '../../../images/select/index.js'

import mapTravel from '../../../images/map/MapVierge.png'
import CityItemMenu from './cityItemMenu'
import { MapBox } from '../mapBox/mapBox'

import InformationButton from '../../informationSection/infoButton/informationButton'

import {
  pieton,
  bike,
  taxi,
  scoot,
  trott,
  transport,
  pietonW,
  bikeW,
  carW,
  scootW,
  trottW,
  transportW,
} from '../../../images/travelTime/index.js'

import { calculCarbonEmission, getRoutingProfile, getTransitCoordinates } from '../../../utilities/helpers.js'

import './travelTimeComponent.css'
import { LoadingWrapper } from '../../loadingWrapper/loadingWrapper.jsx'
function Card(props) {
  const src = props.src
  const travelTime = props.travelTime
  // remove the 'y' if lang is not es
  if (props.lng.toLowerCase() !== 'es' && travelTime?.googleMaps?.includes('y')) {
    travelTime.googleMaps = travelTime?.googleMaps?.replace('y ', '')
  }
  const alt = props.alt

  var travelCardHover = {
    padding: '4px',
    width: '26%',
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'initial',
    marginRight: 'auto',
    marginLeft: 'auto',
    marginBottom: 'auto',
    marginTop: 'auto',
    height: '75px',
    boxShadow: 'rgb(0 0 0 / 15%) 0px 15px 25px',
    borderRadius: '15px',
    backgroundColor: '#FC9254',
    transition: 'all 0.3s ease-in',
  }

  var travelCard = {
    padding: '4px',
    width: '26%',
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'initial',
    marginRight: 'auto',
    marginLeft: 'auto',
    marginBottom: 'auto',
    marginTop: 'auto',
    height: '75px',
    backgroundColor: 'white',
    boxShadow: 'rgb(0 0 0 / 15%) 0px 15px 25px',
    borderRadius: '15px',
    transition: 'all 0.3s ease-in',
  }

  var travelPicto = {
    width: '48px',
  }

  switch (props.format) {
    case 'm':
      travelCard.marginTop = 'auto'
      travelCard.marginBottom = 'auto'
      travelCard.marginRight = 'auto'
      travelCard.marginLeft = 'auto'
      break
    case 's':
      travelPicto.width = '32px'
      travelCard.justifyContent = 'space-evenly'
      travelCard.width = '26%'
      travelCard.marginBottom = '5px'
      travelCard.marginTop = '5px'
      travelCard.marginLeft = 'auto'
      travelCard.marginRight = 'auto'
      break
    default:
      break
  }
  return (
    <div
      style={props.hover ? travelCardHover : travelCard}
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      value={props.value}
      onClick={props.onChange}
    >
      <div className="cardContainer" value={props.value}>
        <img alt={alt} style={travelPicto} src={src} value={props.value} />
        <span className={props.hover ? 'travelTimeHover' : 'travelTime'} value={props.value}>
          {travelTime?.googleMaps}
        </span>
      </div>
    </div>
  )
}

export function TravelTimeComponent(props) {
  const [hover, setHover] = useState(Array(6).fill(false)) // hover = [false, false, false, false, false, false]
  const [selected, setSelected] = useState([true, false, false, false, false, false])

  const [place, setPlace] = useState('Extia')
  const [arrivedPlace, setArrivedPlace] = useState('Sagrada')
  const initCarbonEmi = {
    value: 0,
    unit: '',
    travelPolution: '0',
    source: null,
    costTravel: '87%',
  }
  const [carbonEmi, setCarbonEmi] = useState(initCarbonEmi)

  const [vehicle, setVehicle] = useState('pedestrian')
  const [travel, setTravel] = useState(null)
  const [coordinates, setCoordinates] = useState(null)
  const cardDetails = [
    {
      vehicle: 'pedestrian',
      src: pieton,
      srcW: pietonW,
      alt: t('pedestrian'),
      travelType: getRoutingProfile('pedestrian'),
    },
    {
      vehicle: 'bike',
      src: bike,
      srcW: bikeW,
      alt: t('bike'),
      travelType: getRoutingProfile('bike'),
    },
    {
      vehicle: 'electricScooter',
      src: trott,
      srcW: trottW,
      alt: t('electricScooter'),
      travelType: getRoutingProfile('electricScooter'),
    },
    {
      vehicle: 'motorBike',
      src: scoot,
      srcW: scootW,
      alt: t('scooter'),
      travelType: getRoutingProfile('motorBike'),
    },
    {
      vehicle: 'mediumPetrolCar',
      src: taxi,
      srcW: carW,
      alt: t('car'),
      travelType: getRoutingProfile('car'),
    },
    {
      vehicle: 'subway',
      src: transport,
      srcW: transportW,
      alt: t('publicTransport'),
      travelType: getRoutingProfile('publicTransport'),
    },
  ]

  const handleMouseEnter = (index) => {
    setHover(hover.map((val, i) => (i === index ? true : false)))
  }
  const handleMouseLeave = (index) => {
    setHover(hover.map((val, i) => (i === index ? false : val)))
  }
  const handleChange = (event) => {
    setPlace(event.target.value)
  }
  const handleSecondChange = (event) => {
    setArrivedPlace(event.target.value)
  }
  const handleChangeTravel = async (index, newVehicle) => {
    if (!isNaN(index)) {
      setSelected(
        selected.map((val, idx) => {
          if (idx === index) return true
          else {
            return false
          }
        })
      )
    }
    newVehicle ? setVehicle(newVehicle) : (newVehicle = vehicle)
    const routingProfile = getRoutingProfile(newVehicle)
    const route = travel?.routes?.find((route) => {
      return route.profile === routingProfile
    })
    route ? setCoordinates(route?.geometry?.coordinates) : setCoordinates(null)

    const distanceInMeters = travel?.routes?.find((route) => route.profile === routingProfile)?.distance
    let emissions = await calculCarbonEmission(distanceInMeters, newVehicle)
    let value2 = 0
    if (!isNaN(emissions.totalEmissions)) {
      emissions.totalEmissions = emissions.totalEmissions / 1000
      value2 = 87 - emissions.totalEmissions * 10
      value2 = value2 - emissions.totalEmissions * 25
      value2 = value2.toString() + '%'
    } else value2 = initCarbonEmi.costTravel
    console.log(value2)
    setCarbonEmi({
      value: emissions.value,
      unit: emissions.unit,
      travelPolution: emissions.totalEmissions,
      source: emissions.source,
      costTravel: value2,
    })
  }
  function getCoordinates(placeName) {
    const place = props.cityArrival.places.find((el) => el.name === placeName)
    const coordinates = [place.long, place.lat]
    return coordinates
  }
  function createRoutes(coordinates) {
    return {
      routes: [
        {
          profile: 'walking',
          distance: 0,
          duration: { mapBox: 0, googleMaps: 0 },
          geometry: { coordinates: [coordinates] },
        },
        {
          profile: 'cycling',
          distance: 0,
          duration: { mapBox: 0, googleMaps: 0 },
          geometry: { coordinates: [coordinates] },
        },
        {
          profile: 'driving-traffic',
          distance: 0,
          duration: { mapBox: 0, googleMaps: 0 },
          geometry: { coordinates: [coordinates] },
        },
        {
          profile: 'transit',
          distance: 0,
          duration: { mapBox: 0, googleMaps: 0 },
          geometry: { coordinates: [coordinates] },
        },
      ],
    }
  }

  async function fetchRoutes(place1, place2) {
    const params = new URLSearchParams({
      city: props.cityArrival?.name,
      place1: place1,
      place2: place2,
    })
    const response = await fetch(`${process.env.REACT_APP_API_URL}/travels?${params}`)
    const result = await response.json()
    const travel = result[0]
    getTransitCoordinates(travel)

    return travel
  }

  const styles = {
    travelTimeStyle: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      width: props.format === 's' ? '100%' : 'calc(50% - 12px)',
      padding: '12px',
      border: '0px solid rgba(255, 255, 255)',
      boxShadow: 'rgb(0 0 0 / 15%) px 15px 25px',
      borderRadius: '30px',
    },
    selectStyle: {
      position: 'relative',
      width: '100%',
      fontFamily: 'Mont',
      fontWeight: 'bold',
      height: '100%',
    },
    itemMenuStyle: {
      // height: "40px",
      fontFamily: "'Nunito', sans-serif",
    },
    travelPicto: {
      width: props.format === 's' ? '32px' : '48px',
    },
  }
  useEffect(() => {
    const getTravelData = async () => {
      let travelData
      if (place !== arrivedPlace) {
        travelData = await fetchRoutes(place, arrivedPlace)
      } else {
        // If the user select the same place for departure and arrival we create a fake route with
        //  the coordinates of the place and 0 for distance and duration
        const coordinates = getCoordinates(place)
        travelData = createRoutes(coordinates)
      }
      setTravel(travelData)
    }
    getTravelData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [place, arrivedPlace, props.cityArrival])

  // Refresh the route coordinates when the travel change
  useEffect(() => {
    handleChangeTravel()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [travel])

  return (
    <>
      {props.cityArrival && (
        <MapBox
          map={mapTravel}
          place={place}
          arrivedPlace={arrivedPlace}
          format={props.format}
          // travelType={travelType}
          cityArrival={props.cityArrival}
          coordinates={coordinates}
        />
      )}
      {props.cityArrival?.places?.length > 0 && (
        <div className="selectCard">
          <div className="startTravel">
            <Select style={styles.selectStyle} value={place} onChange={handleChange}>
              {props.cityArrival?.places?.map(({ name, type, img }, index) => (
                <MenuItem key={name} value={name} style={styles.itemMenuStyle}>
                  <CityItemMenu name={name} picture={img ? selectImages[img] : selectImages[type]} />
                </MenuItem>
              ))}
            </Select>
          </div>
          <div className="separator"></div>
          <div className="travelSelectContainer">
            <Select style={styles.selectStyle} value={arrivedPlace} onChange={handleSecondChange}>
              {props.cityArrival?.places?.map(({ name, type, img }, index) => (
                <MenuItem key={name} value={name} style={styles.itemMenuStyle}>
                  <CityItemMenu name={name} picture={img ? selectImages[img] : selectImages[type]} />
                </MenuItem>
              ))}
            </Select>
          </div>
        </div>
      )}
      <div className="travelCardContainer">
        {cardDetails.map((card, index) => (
          <Card
            key={index}
            lng={props.lng}
            format={props.format}
            src={hover[index] ? card.srcW : card.src}
            alt={card.alt}
            travelTime={travel?.routes?.find((route) => route.profile === card.travelType)?.duration}
            hover={hover[index] || selected[index]}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
            onChange={() => {
              handleChangeTravel(index, card.vehicle)
            }}
          />
        ))}
      </div>
      <div className="co2Infos">
        <LoadingWrapper isLoading={!carbonEmi?.travelPolution && vehicle !== 'pedestrian' && vehicle !== 'bike'}>
          <p className="barText">
            {t('travelTimeCO2')} {carbonEmi?.travelPolution || '0'} kgCO2e
          </p>
        </LoadingWrapper>
        {carbonEmi?.travelPolution ? (
          <div className="co2BtnInfo">
            <InformationButton
              information={`calculation : distance * vehicle emission per km
              emissions per km for ${vehicle} = ${carbonEmi.value} ${carbonEmi.unit}
              ${carbonEmi.source ? 'source : ' + carbonEmi.source : ''}`}
              direction="bottom"
            />
          </div>
        ) : null}
      </div>
      {console.log(typeof carbonEmi.costTravel, carbonEmi.costTravel)}
      <div className="barContainer">
        <div className="barColor1"></div>
        <div className="barColor2"></div>
        <div className="barColor3"></div>
        <div className="barColor4"></div>
        <div className="barColor5"></div>
        <div className="barColor6"></div>
        <div className="barColor7"></div>
      </div>
      <div
        style={{
          margin: 'auto',
          width: '90%',
          paddingLeft: carbonEmi.costTravel,
          transition: 'padding-left 0.1s ease-in-out 0s',
        }}
      >
        <div className="triangle"></div>
      </div>
    </>
  )
}
