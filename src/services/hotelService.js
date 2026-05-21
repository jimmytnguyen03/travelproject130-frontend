import axios from 'axios'

const API_BASE = '/api/v1'

function mapHotel(hotel, index = 0) {
  const pricePerNight = Number(
    hotel.pricePerNight ||
    hotel.nightlyPrice ||
    hotel.price ||
    0
  )

  const nights = Number(hotel.nights || 7)
  const totalPrice = Number(hotel.totalPrice || pricePerNight * nights)

  return {
    id: hotel.id || hotel.accommodationId || `HOTEL-${index + 1}`,
    accommodationId: hotel.accommodationId || hotel.id || `HOTEL-${index + 1}`,
    name: hotel.name || hotel.hotelName || 'London Budget Hostel',
    location: hotel.location || hotel.address || 'Central London',
    pricePerNight,
    nights,
    totalPrice,
    imageIndex: index % 5,
    stars: hotel.stars || 3,
    rating: hotel.rating || 4.3,
    reviews: hotel.reviews || 128,
    amenities: hotel.amenities || ['Free WiFi', 'Budget Friendly', 'Central Location'],
    roomType: hotel.roomType || 'Shared Dorm',
    currency: hotel.currency || 'USD',
  }
}

export const hotelService = {
  async search(params) {
    const response = await axios.get(`${API_BASE}/hotels/search`, {
      params: {
        destination: params.destination,
        checkIn: params.fromDate,
        checkOut: params.toDate,
        guests: params.adults || 1,
        adults: params.adults || 1,
        children: params.children || 0,
      },
    })

    const payload = response.data
    const hotels = payload.results || payload.data || []

    return hotels.map(mapHotel)
  },
}