import { t } from 'i18next'
import { useEffect, useState } from 'react'

import backArrow from '../../../images/back.png'
import solo from '../../../images/lifeStyle/flat.png'
import beer from '../../../images/lifeStyle/beer.png'
import couple from '../../../images/lifeStyle/couple.png'
import family from '../../../images/lifeStyle/famille.png'
import roommate from '../../../images/lifeStyle/coloc.png'
import cutlery from '../../../images/lifeStyle/restaurant.png'
import rocket from '../../../images/backgroundImages/rocket.png'
import clouds from '../../../images/backgroundImages/clouds.png'

// import { cityArrival } from "../../../data/cityName";

import InformationButton from '../../informationSection/infoButton/informationButton'
import { LoadingWrapper } from '../../loadingWrapper/loadingWrapper'

import './lifeCost.css'

function handleSrc(lifeStyle) {
  return lifeStyle === 0
    ? solo
    : lifeStyle < 2
    ? couple
    : lifeStyle === 2
    ? roommate
    : lifeStyle > 2
    ? family
    : roommate
}

function handleLifeCost(lifeStyle, city) {
  if (lifeStyle === '1') {
    return city.oneBedroom + '€'
  }
  if (lifeStyle === '2') {
    return city.colocation + '€'
  }
  if (lifeStyle === '3') {
    return city.threeBedroom + '€'
  }
}

function handleLifeCostArrival(lifeStyle, city) {
  return lifeStyle < 2
    ? city.oneBedroom + '€'
    : lifeStyle === 2
    ? city.colocation + '€'
    : lifeStyle > 2
    ? city.threeBedroom + '€'
    : city.colocation + '€'
}

function Card(props) {
  const logo = props.logo
  const priceCity = props.priceCity
  const priceArrival = props.priceArrival
  const handleChange = props.handleChange
  const cityDeparture = props.cityDeparture
  const cityArrival = props.cityArrival
  return (
    <>
      <div className="lifeCostCard">
        <div className="topContainer">
          <img alt="iconCard" src={logo} className="iconCard" />
          <div className="rowContainer">
            <span className="averagePrice" style={props.food ? { marginBottom: '25px' } : {}}>
              {props.averagePrice}
            </span>
            <div className="informationButton">
              <InformationButton information={'costLivingDataFrom'} direction="bottom" />
            </div>
          </div>
        </div>
        <div className="citiesPricesContainer">
          <div className="bottomContainer">
            <span className="city">{cityDeparture?.code}</span>
            <span className="city" style={{ color: '#FC9254' }}>
              /
            </span>
            <span className="city">{cityArrival?.code}</span>
          </div>
          <div className="bottomContainer">
            <LoadingWrapper isLoading={!priceCity} height={40} width={40} wrapperClass={'currentPrice'}>
              <span className="currentPrice">{priceCity + '€'}</span>
            </LoadingWrapper>
            <LoadingWrapper isLoading={!priceArrival} wrapperClass={'currentPrice'}>
              <span className="currentPrice">{priceArrival + '€'}</span>
            </LoadingWrapper>
          </div>
        </div>
        {handleChange && (
          <button className="backArrowBtn" onClick={handleChange}>
            <img src={backArrow} className="backArrow" alt="img" />
          </button>
        )}
      </div>
    </>
  )
}

function CardLifeStyle(props) {
  return (
    <div className="lifeCostCard">
      <div className="topContainer">
        <img alt="iconCard" src={props.logo} className="iconCard" style={{ marginBottom: '-10px' }} />
        <span className="averagePrice">{t('averagePriceAppartement')}</span>
      </div>
      <div className="citiesPricesContainer" style={{ marginBottom: '10px' }}>
        <button type="submit" onClick={props.handleChange} className="livingButton" value={2}>
          {t('roommate')}
        </button>
        <button type="submit" onClick={props.handleChange} className="livingButton" value={1}>
          {t('alone')}
        </button>
        <button type="submit" onClick={props.handleChange} className="livingButton" value={3}>
          {t('family')}
        </button>
      </div>
    </div>
  )
}

export function LifeCost(props) {
  const [lifeStyle, setLifeStyle] = useState(0)
  const [cityData, setCityData] = useState({})
  const [cityArrivalData, setCityArrivalData] = useState({})
  const cityDeparture = props.cityDeparture
  const cityArrival = props.cityArrival
  const appartementPrice =
    lifeStyle < 2
      ? t('averagePriceAppartementCouple')
      : lifeStyle === 2
      ? t('averagePriceAppartementCouple')
      : lifeStyle > 2
      ? t('averagePriceAppartementFamily')
      : t('averagePriceAppartementFlatsharing')

  useEffect(() => {
    if (!cityDeparture?.api_name || !cityArrival?.api_name) {
      return
    }
    try {
      fetch(`${process.env.REACT_APP_API_URL}/lifeCost/${cityDeparture.api_name}`)
        .then((res) => res.json())
        .then((res) => setCityData(res))
        .catch((err) => console.error(err))

      fetch(`${process.env.REACT_APP_API_URL}/lifeCost/${cityArrival.api_name}`)
        .then((res) => res.json())
        .then((res) => setCityArrivalData(res))
        .catch((err) => console.error(err))
    } catch (err) {
      console.log(err)
    }
  }, [cityDeparture?.api_name, cityArrival?.api_name])

  const handleChange = (event) => {
    setLifeStyle(event.target.value)
  }

  return (
    <>
      <div className="images">
        <div className="circle"></div>
        <div className="rocketdiv">
          <img className="rocket" alt="iconCard" src={rocket} />
        </div>
        <div className="cloudsdiv">
          <img className="clouds" alt="iconCard" src={clouds} />
        </div>
      </div>
      <div className="cardsComponent">
        <Card
          logo={beer}
          cityDeparture={cityDeparture}
          cityArrival={cityArrival}
          cityPicto={cityArrival?.logo.url}
          priceCity={cityData.beerPrice}
          priceArrival={cityArrivalData.beerPrice}
          averagePrice={t('averagePriceBeer')}
          food={true}
        />
        <Card
          logo={cutlery}
          cityDeparture={cityDeparture}
          cityArrival={cityArrival}
          cityPicto={cityArrival?.logo.url}
          priceCity={cityData.restaurantPrice}
          priceArrival={cityArrivalData.restaurantPrice}
          averagePrice={t('averagePriceFood')}
        />
        {lifeStyle > 0 ? (
          <Card
            logo={handleSrc(lifeStyle)}
            cityDeparture={cityDeparture}
            cityArrival={cityArrival}
            cityPicto={cityArrival?.logo}
            priceCity={handleLifeCost(lifeStyle, cityData.apartmentPrice)}
            priceArrival={handleLifeCostArrival(lifeStyle, cityArrivalData.apartmentPrice)}
            handleChange={handleChange}
            averagePrice={appartementPrice}
          />
        ) : (
          <CardLifeStyle handleChange={handleChange} logo={solo} />
        )}
      </div>
    </>
  )
}
