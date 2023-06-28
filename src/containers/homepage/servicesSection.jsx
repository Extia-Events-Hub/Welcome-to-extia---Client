import { TravelTimeComponent } from '../../components/servicesSection/travelTimeComponent/travelTimeComponent'
import WeatherCarousel from '../../components/servicesSection/weatherCarousel/weatherCarousel'
import { LifeCost } from '../../components/servicesSection/lifeCost/lifeCost'
import { ActualWeather } from '../../components/servicesSection/actualWeatherComponent/actualWeatherComponent'
import './servicesSection.css'

export function ServicesSection(props) {
  // const city = props.cityDeparture;
  const format = props.format

  var weatherSectionStyle = {
    width: '50%',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    height: 'auto',
    paddingTop: '24px',
  }
  var backgroundStyle = {
    backgroundColor: '#FC9254',
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '10px 10px 10px 10px',
  }

  var mapAndTravelStyle = {
    border: '0px solid rgba(255, 255, 255)',
    backgroundColor: 'white',
    boxShadow: 'rgb(0 0 0 / 15%) 0px 15px 25px',
    borderRadius: '30px',
    marginTop: '24px',
    flexWrap: 'wrap',
    width: '55%',
    height: '735px',
    marginLeft: '5%',
  }

  var lifeCostStyle = {
    width: '100%',
    marginTop: '50px',
  }

  var flexBox = {
    display: 'inline-flex',
  }
  switch (format) {
    case 's':
      weatherSectionStyle = {
        ...weatherSectionStyle,
        width: '100%',
      }
      flexBox = {
        ...flexBox,
        display: 'block',
      }
      mapAndTravelStyle = {
        ...mapAndTravelStyle,
        width: '100%',
        marginLeft: '0%',
        height: '700px',
        paddingBottom: '60px',
      }
      lifeCostStyle = {
        ...lifeCostStyle,
        width: '100%',
        overflowX: 'scroll',
      }
      backgroundStyle = {
        ...backgroundStyle,
        padding: '10px 10px 70px 10px',
      }
      break
    case 'm':
      flexBox = {
        ...flexBox,
        display: '',
      }
      weatherSectionStyle = {
        ...weatherSectionStyle,
        width: '80%',
        marginLeft: '16%',
      }
      mapAndTravelStyle = {
        ...mapAndTravelStyle,
        width: '80%',
        marginLeft: '16%',
      }
      lifeCostStyle = {
        ...lifeCostStyle,
        width: '80%',
        marginLeft: '16%',
      }
      backgroundStyle = {
        ...backgroundStyle,
        padding: '10px 10px 70px 10px',
      }
      break
    case 'l':
      backgroundStyle = {
        ...backgroundStyle,
        padding: '24px 3% 80px 12%',
      }
      break
    default:
      break
  }

  return (
    <div style={backgroundStyle} id="weather">
      <div style={flexBox}>
        <div style={weatherSectionStyle}>
          <ActualWeather cityDeparture={props.cityDeparture} cityArrival={props.cityArrival} format={props.format} />
          <WeatherCarousel cityDeparture={props.cityDeparture} cityArrival={props.cityArrival} format={props.format} />
        </div>
        <div style={mapAndTravelStyle}>
          <TravelTimeComponent lng={props.lng} format={props.format} cityArrival={props.cityArrival} />
        </div>
      </div>
      <div style={lifeCostStyle}>
        <LifeCost
          onChange={props.onChange}
          cityDeparture={props.cityDeparture}
          cityArrival={props.cityArrival}
          format={props.format}
        />
      </div>
    </div>
  )
}
