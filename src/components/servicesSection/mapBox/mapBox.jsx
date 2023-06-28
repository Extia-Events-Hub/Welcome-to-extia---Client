import React, { useRef, useState, useEffect } from 'react'
import './mapBox.css'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import MapIcons from '../../../images/map/separateIcons/mapIcons'
// import geojsonWalking from "../../../data/goejson/geojsonWalking.json";
// import geojsonDriving from "../../../data/goejson/geojsonDriving.json";
// import geojsonCycling from "../../../data/goejson/geojsonCycling.json";

// Token from .env file
const mapBoxToken = process.env.REACT_APP_MAPBOX_TOKEN

mapboxgl.accessToken = mapBoxToken

export function MapBox(props) {
  const mapContainer = useRef(null)
  const map = useRef(null)
  const [lng, setLng] = useState(2.200551)
  const [lat, setLat] = useState(41.369955)
  const [tripLine] = useState([
    [2.192497, 41.40187],
    [2.192298, 41.402026],
    [2.19183, 41.401674],
    [2.191673, 41.401763],
    [2.191445, 41.401768],
    [2.191384, 41.40173],
    [2.188966, 41.403554],
    [2.188832, 41.40352],
    [2.188642, 41.403261],
    [2.187926, 41.403319],
    [2.187392, 41.402862],
    [2.187231, 41.403015],
    [2.186153, 41.402347],
    [2.183378, 41.404318],
    [2.182498, 41.404994],
    [2.182407, 41.404947],
    [2.182096, 41.404973],
    [2.182032, 41.405046],
    [2.18019, 41.403675],
    [2.180112, 41.403737],
    [2.17985, 41.403752],
    [2.179779, 41.403713],
    [2.179099, 41.404222],
    [2.17906, 41.404181],
    [2.178744, 41.404183],
    [2.178663, 41.404231],
    [2.17801, 41.40374],
    [2.177946, 41.40379],
    [2.177655, 41.403798],
    [2.177595, 41.403753],
    [2.176913, 41.404251],
    [2.176854, 41.404213],
    [2.176517, 41.40422],
    [2.176395, 41.404313],
    [2.176246, 41.404209],
    [2.176203, 41.404244],
    [2.176182, 41.404433],
    [2.175846, 41.404453],
    [2.175758, 41.404572],
  ])
  const [zoom, setZoom] = useState(11)
  const [geoJson, setGeoJson] = useState([])
  const cityArrival = props.cityArrival

  function centerMap(features = null) {
    if (geoJson.length === 0 && !features) {
      return
    }
    features = geoJson.length ? geoJson : features
    var markers = Array.from(document.getElementsByClassName('marker'))
    var markersToHide = markers.filter(
      (marker) => !marker.classList.contains(props.place) && !marker.classList.contains(props.arrivedPlace)
    )
    for (var m of markers) {
      m.style.display = 'block'
    }
    for (var j of markersToHide) {
      j.style.display = 'none'
    }

    var featurePlace = features.find((f) => f.name === props.place)
    var featureArrivedPlace = features.find((f) => f.name === props.arrivedPlace)
    // var featurePlaceCoordinates = featurePlace.geometry.coordinates;
    // var featureArrivedPlaceCoordinates = featureArrivedPlace.geometry.coordinates;
    const featurePlaceCoordinates = [featurePlace.long, featurePlace.lat]
    const featureArrivedPlaceCoordinates = [featureArrivedPlace.long, featureArrivedPlace.lat]

    var bounds = new mapboxgl.LngLatBounds([featurePlaceCoordinates, featureArrivedPlaceCoordinates])
    props.coordinates?.forEach((coord) => {
      bounds.extend(coord)
    })

    map.current.fitBounds(bounds, { padding: 80 })
  }

  useEffect(() => {
    if (!map.current) return
    map.current.flyTo({
      center: [lng, lat],
    })
    // eslint-disable-next-line
  }, [])

  // eslint-disable-next-line
  useEffect(() => {
    if (map.current) return // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mbenkraouda/cl0hwunol001u15p1erz8bof3',
      center: [lng, lat],
      zoom: zoom,
      maxZoom: 15,
      interactive: false,
    })
    if (cityArrival.places) setGeoJson(cityArrival.places)
    for (const place of cityArrival.places) {
      var el = document.createElement('div')
      el.className = 'marker ' + place.name
      if (!(place.name in MapIcons)) {
        el.insertAdjacentHTML(
          'afterbegin',
          '<svg display="block" height="32.800000000000004px" width="21.6px" viewBox="0 0 27 41"><defs><radialGradient id="shadowGradient"><stop offset="10%" stop-opacity="0.4"></stop><stop offset="100%" stop-opacity="0.05"></stop></radialGradient></defs><ellipse cx="13.5" cy="34.8" rx="10.5" ry="5.25" fill="url(#shadowGradient)"></ellipse><path fill="#ffffff" d="M27,13.5C27,19.07 20.25,27 14.75,34.5C14.02,35.5 12.98,35.5 12.25,34.5C6.75,27 0,19.22 0,13.5C0,6.04 6.04,0 13.5,0C20.96,0 27,6.04 27,13.5Z"></path><path opacity="0.25" d="M13.5,0C6.04,0 0,6.04 0,13.5C0,19.22 6.75,27 12.25,34.5C13,35.52 14.02,35.5 14.75,34.5C20.25,27 27,19.07 27,13.5C27,6.04 20.96,0 13.5,0ZM13.5,1C20.42,1 26,6.58 26,13.5C26,15.9 24.5,19.18 22.22,22.74C19.95,26.3 16.71,30.14 13.94,33.91C13.74,34.18 13.61,34.32 13.5,34.44C13.39,34.32 13.26,34.18 13.06,33.91C10.28,30.13 7.41,26.31 5.02,22.77C2.62,19.23 1,15.95 1,13.5C1,6.58 6.58,1 13.5,1Z"></path><circle fill="white" cx="13.5" cy="13.5" r="5.5"></circle></svg>'
        )
      } else {
        el.style.backgroundImage = `url('${MapIcons[place.name]}')`
      }
      new mapboxgl.Marker(el).setLngLat([place.long, place.lat]).addTo(map.current)
    }
    map.current.resize()
    centerMap(cityArrival.places)
  })

  // Set LNG, LAT, ZOOM on map move
  useEffect(() => {
    if (!map.current) return // wait for map to initialize
    map.current.on('move', () => {
      setLng(map.current.getCenter().lng)
      setLat(map.current.getCenter().lat)
      setZoom(map.current.getZoom())
    })
  })

  /* const getType = (type) => {
    const trip = `${props.place} - ${props.arrivedPlace}`;
    switch (type) {
      case "bike":
        const geojsonCyclingFilter = geojsonCycling.filter(
          (el) => el.trip === trip
        );
        return (
          geojsonCyclingFilter?.[0]?.cyclingJson?.routes?.[0]?.geometry
            ?.coordinates || []
        );
      case "walk":
        const geojsonWalkingFilter = geojsonWalking.filter(
          (el) => el.trip === trip
        );
        return (
          geojsonWalkingFilter?.[0]?.walkingJson?.routes?.[0]?.geometry
            ?.coordinates || []
        );
      case "driving":
        const geojsonDrivingFilter = geojsonDriving.filter(
          (el) => el.trip === trip
        );
        return (
          geojsonDrivingFilter?.[0]?.drivingJson?.routes?.[0]?.geometry
            ?.coordinates || []
        );
      default:
        const geojson = geojsonWalking.filter((el) => el.trip === trip);
        return (
          geojson?.[0]?.walkingJson?.routes?.[0]?.geometry?.coordinates || []
        );
    }
  };*/

  useEffect(() => {
    centerMap()
    // const { travelType } = props;

    const source = map.current.getSource('LineString')
    if (source) {
      source.setData({
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            geometry: {
              type: 'LineString',
              properties: {},
              // coordinates: getType(travelType),
              coordinates: props.coordinates,
            },
          },
        ],
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.place, props.arrivedPlace, props.coordinates])

  useEffect(() => {
    map.current.on('load', () => {
      map.current.addSource('LineString', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              geometry: {
                type: 'LineString',
                properties: {},
                coordinates: tripLine,
              },
            },
          ],
        },
      })
      map.current.addLayer({
        id: 'LineString',
        type: 'line',
        source: 'LineString',
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-color': 'rgb(253,145,83)',
          'line-width': 5,
        },
      })
    })
    // eslint-disable-next-line
  }, [])

  return (
    <div className="map">
      <div ref={mapContainer} className="map-container"></div>
    </div>
  )
}
