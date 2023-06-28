import React, { useEffect, useState } from 'react'
import sun from '../../../images/carousel/sunny.png'
import cloud from '../../../images/carousel/sun.png'
import rain from '../../../images/carousel/rain.png'
import clear from '../../../images/carousel/sunny.png'
import snow from '../../../images/carousel/rain.png'
import drizzle from '../../../images/carousel/rain.png'
import thunderstorm from '../../../images/carousel/rain.png'
import atmosphere from '../../../images/carousel/rain.png'
// import { cityArrival } from "../../../data/cityName";
import { t } from 'i18next'

import './actualWeatherComponent.css'
import { LoadingWrapper } from '../../loadingWrapper/loadingWrapper'
import { RotatingSquare } from 'react-loader-spinner'

const getWeather = async (city) => {
  const api_call = await fetch(`${process.env.REACT_APP_API_URL}/weather/${city}`).then((response) => response.json())
  return api_call
}

function getPictoWeather(weather) {
  if (weather === 'Clouds') return cloud
  else if (weather === 'Clear') return clear
  else if (weather === 'Rain') return rain
  else if (weather === 'Sun') return sun
  else if (weather === 'Snow') return snow
  else if (weather === 'Thunderstorm') return thunderstorm
  else if (weather === 'Atmosphere') return atmosphere
  else if (weather === 'Drizzle') return drizzle
  else if (weather === 'Fog') return drizzle
  return cloud
}

function WeatherComponent(props) {
  const city = props.city
  const weatherPic = props.src
  const items = props.items
  const format = props.format

  var travelTimeCityStyle
  var tempText
  var celsiusText
  var weatherPicStyle
  var pictoTemperatureStyle

  switch (format) {
    case 's':
      tempText = {
        fontFamily: 'mont',
        color: '#283D47',
        fontSize: '110%',
        textAlign: 'center',
        marginTop: '2%',
      }

      celsiusText = {
        fontFamily: 'gotham',
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#283D47',
        width: '100%',
      }

      travelTimeCityStyle = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 'calc(50% - 12px)',
        zIndex: '1',
      }

      weatherPicStyle = {
        display: 'block',
        width: '48px',
        height: '48px',
        marginRight: '10px',
      }

      pictoTemperatureStyle = {
        display: 'flex',
        flexDirection: 'row',
        // justifyContent: "center",
        alignItems: 'center',
        marginTop: '10px',
      }

      break

    case 'm':
      tempText = {
        fontFamily: 'gotham',
        fontWeight: 'bold',
        textSizeAdjust: 'none',
        color: '#283D47',
        fontSize: '35px',
        textAlign: 'center',
        marginBottom: '4%',
      }

      celsiusText = {
        fontFamily: 'gotham',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: '35px',
        color: '#283D47',
        width: '100%',
      }

      travelTimeCityStyle = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 'calc(50% - 12px)',
        padding: '12px',
        borderRadius: '30px',
        backgroundColor: 'white',
      }

      weatherPicStyle = {
        display: 'block',
        width: '84px',
        marginRight: '20px',
      }

      pictoTemperatureStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }

      break

    case 'l':
      tempText = {
        fontFamily: 'gotham',
        fontWeight: 'bold',
        textSizeAdjust: 'none',
        color: '#283D47',
        fontSize: '35px',
        textAlign: 'center',
        marginBottom: '4%',
      }

      celsiusText = {
        fontFamily: 'gotham',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: '35px',
        color: '#283D47',
        width: '100%',
      }

      travelTimeCityStyle = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 'calc(50% - 12px)',
        padding: '12px',
        borderRadius: '30px',
        backgroundColor: 'white',
      }

      weatherPicStyle = {
        display: 'block',
        width: '84px',
        marginRight: '20px',
      }

      pictoTemperatureStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }
      break
    default:
      break
  }

  return (
    <div style={travelTimeCityStyle}>
      <LoadingWrapper isLoading={city ? false : true}>
        <span style={tempText}>{city}</span>
      </LoadingWrapper>
      <div style={pictoTemperatureStyle}>
        <LoadingWrapper isLoading={!weatherPic} loader={RotatingSquare} height={100} width={100}>
          <img alt="weather" src={weatherPic} style={weatherPicStyle}></img>
        </LoadingWrapper>
        <span style={celsiusText}>{items ? Math.round(items.main.temp - 273.15) : null} °C</span>
      </div>
    </div>
  )
}

export function ActualWeather(props) {
  const [weatherPic, setWeatherPic] = useState()
  const [weatherPicArrival, setWeatherPicArrival] = useState()
  const [items, setItems] = useState()
  const [weatherArrival, setWeatherArrival] = useState()

  const format = props.format

  var CardStyle
  var line
  var weatherOfTheDayStyle

  useEffect(() => {
    if (!props.cityDeparture || !props.cityArrival) {
      return
    }
    getWeather(props.cityArrival.name).then((res) => {
      setWeatherArrival(res)
      setWeatherPicArrival(getPictoWeather(res.weather[0].main))
    })
    getWeather(props.cityDeparture.name).then((res) => {
      setItems(res)
      setWeatherPic(getPictoWeather(res.weather[0].main))
    })
  }, [props.cityDeparture, props.cityArrival])

  switch (format) {
    case 's':
      CardStyle = {
        justifyContent: 'space-around',
        borderRadius: '30px 30px 0px 0px',
        boxShadow: 'rgb(0 0 0 / 15%) 0px 15px 25px',
        backgroundColor: 'white',
        width: '100%',
        padding: '12px',
        height: '190px',
      }

      line = {
        width: '3px',
        backgroundColor: '#FC9254',
        height: 'CardStyle.height',
        marginLeft: '2px',
        marginRight: '2px',
      }
      weatherOfTheDayStyle = {
        display: 'flex',
        width: '100%',
        marginBottom: '5%',
        marginLeft: '6px',
      }
      break
    case 'm':
      CardStyle = {
        height: '367px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        verticalAlign: 'middle',
        borderRadius: '30px 30px 0px 0px',
        boxShadow: 'rgb(0 0 0 / 15%) 0px 15px 25px',
        backgroundColor: 'white',
        width: '100%',
        padding: '0',
      }

      line = {
        width: '3px',
        backgroundColor: '#FC9254',
        height: 'CardStyle.height',
      }
      weatherOfTheDayStyle = {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-around',
        marginBottom: '5%',
      }
      break
    case 'l':
      CardStyle = {
        height: '367px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        verticalAlign: 'middle',
        borderRadius: '30px 30px 0px 0px',
        boxShadow: 'rgb(0 0 0 / 15%) 0px 15px 25px',
        backgroundColor: 'white',
        width: '100%',
        padding: '0',
      }

      line = {
        width: '3px',
        backgroundColor: '#FC9254',
        height: 'CardStyle.height',
      }

      weatherOfTheDayStyle = {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        marginBottom: '5%',
      }
      break
    default:
      break
  }

  return (
    <div style={CardStyle}>
      <span className="weatherTitle">{t('weather of the day')}</span>
      <div style={weatherOfTheDayStyle}>
        <WeatherComponent city={t(props.cityDeparture?.name)} src={weatherPic} items={items} format={props.format} />
        <div style={line} />
        <WeatherComponent
          city={t(props.cityArrival?.name)}
          src={weatherPicArrival}
          items={weatherArrival}
          format={props.format}
        />
      </div>
    </div>
  )
}
