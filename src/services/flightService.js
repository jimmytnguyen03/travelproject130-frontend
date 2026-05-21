import axios from 'axios'

const API_BASE = '/api/v1'

function mapFlight(flight, index = 0) {
  const price = Number(flight.totalPrice || flight.price || 0)

  return {
    id: flight.id || flight.flightId || `FL-${index + 1}`,
    flightId: flight.flightId || flight.id || `FL-${index + 1}`,
    airline: flight.airline || 'Budget Air',
    flightNumber: flight.flightNumber || flight.flightId || flight.id || `FL${index + 1}`,
    aircraft: flight.aircraft || 'Economy Jet',
    totalPrice: price,
    pricePerPerson: price,
    departureTime: flight.departureTime || '08:00',
    arrivalTime: flight.arrivalTime || '20:00',
    origin: flight.origin || flight.departureAirport || flight.from || 'SFO',
    destination: flight.destination || flight.arrivalAirport || flight.to || 'LON',
    stops: flight.stops ?? 0,
    duration: flight.duration || '10h 30m',
    class: flight.class || flight.cabinClass || 'Economy',
    seatsAvailable: flight.seatsAvailable ?? 9,
    currency: flight.currency || 'USD',
    departDate: flight.departDate,
    returnDate: flight.returnDate,
  }
}

export const flightService = {
  async search(params) {
    const response = await axios.get(`${API_BASE}/flights/search`, {
      params: {
        origin: params.origin,
        destination: params.destination,
        departDate: params.fromDate,
        returnDate: params.toDate,
        travelers: params.adults || 1,
        adults: params.adults || 1,
        children: params.children || 0,
      },
    })

    const payload = response.data
    const flights = payload.results || payload.data || []

    return flights.map(mapFlight)
  },
}