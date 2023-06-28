/**
 * Formats the given time in seconds into a string of hours and minutes.
 *
 * @param {number} secondes - The time in seconds to format.
 * @returns {string} The formatted time, e.g., "2h30 min" or "45 min".
 */
function formatTime(secondes) {
    if (isNaN(secondes)) return '?'
    let minutes = Math.round(secondes / 60)
    const hours = Math.floor(minutes / 60)

    if (hours) {
      minutes = Math.round(minutes % 60)
      return `${hours}h${minutes} min`
    } else {
      return `${minutes} min`
    }
}

/**
 * Returns the routing profile based on the given vehicle type.
 *
 * @param {string} vehicle - The type of vehicle.
 * @returns {string} The routing profile, e.g., "transit", "driving-traffic", "cycling", or "walking".
 */
function getRoutingProfile(vehicle) {
  switch (vehicle) {
    case 'subway':
    case 'publicTransport':
      return 'transit'
    case 'car':
    case 'electricMotorBike':
      return 'driving-traffic'
    case 'bike':
    case 'electricBike':
    case 'electricScooter':
    case 'cycling':
      return 'cycling'
    case 'pieton':
    case 'walking':
    case 'foot':
    case 'pedestrian':
    case 'walk':
      return 'walking'
    default:
      return 'driving-traffic'
  }
}

/**
 * Adjusts the transit coordinates of the given travel object to match the driving coordinates.
 *
 * @param {Object} travel - The travel object.
 * @returns {Object} The adjusted travel object.
 */
function getTransitCoordinates(travel){
  const drivingCoordinates = travel?.routes?.find((route) => {
    return route.profile === 'driving-traffic'
  })
  const travelWithTransit = travel?.routes?.map((route) => {
    if (route.profile === 'transit') {
      route = {
        ...route,
        distance: drivingCoordinates?.distance,
        geometry: { coordinates: drivingCoordinates?.geometry?.coordinates },
      }
    }
    return route
  })
  travel.routes = travelWithTransit
  return travel
}

/**
 * Calculates the carbon emission based on the given distance and vehicle type.
 *
 * @async
 * @param {number} meters - The distance in meters.
 * @param {string} vehicle - The type of vehicle.
 * @returns {Promise<Object>} The calculated carbon emissions, including the value, unit, total emissions, and info source.
 */
async function calculCarbonEmission(meters, vehicle) {
  if (vehicle === 'pedestrian' || vehicle === 'bike' || !meters) {
    return 0
  } 
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/carbonEmissions/vehicle/${vehicle}`
  )
  const carbonEmissions = await response.json()
  const totalEmissions = Math.round(meters / 1000 * carbonEmissions.emissions)
  const emissions = {
    value: carbonEmissions.emissions,
    unit: carbonEmissions.emissionsUnit,
    totalEmissions: totalEmissions,
    source: carbonEmissions.source,
  }
  //console.log(emissions)
  return emissions
}

  module.exports = {formatTime, calculCarbonEmission, getRoutingProfile, getTransitCoordinates}