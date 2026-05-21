import axios from 'axios'

const API_BASE = '/api/v1'

export const activityService = {
  async search(params) {
    const response = await axios.get(`${API_BASE}/attractions/search`, {
      params: {
        destination: params.destination,
        dest_name: params.destination,
        start_date: params.fromDate,
        end_date: params.toDate,
        priceFilter: 'free',
      },
    })

    const payload = response.data

    return payload.results || payload.data || []
  },
}