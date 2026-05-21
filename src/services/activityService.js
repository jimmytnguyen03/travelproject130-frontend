import axios from 'axios'

const API_BASE = '/api/v1'

function getActivityIcon(category = '') {
  const normalized = String(category).toLowerCase()

  if (normalized.includes('museum')) return '🏛️'
  if (normalized.includes('walking')) return '🚶'
  if (normalized.includes('sightseeing')) return '📸'
  if (normalized.includes('food')) return '🍽️'
  if (normalized.includes('tour')) return '🗺️'

  return '🎯'
}

function mapActivity(activity, index = 0) {
  const price = Number(
    activity.pricePerPerson ??
    activity.price ??
    activity.Rate ??
    0
  )

  return {
    id: activity.id || activity.activityId || `ACT-${index + 1}`,
    activityId: activity.activityId || activity.id || `ACT-${index + 1}`,

    icon: activity.icon || getActivityIcon(activity.category),
    name: activity.name || activity.title || `Activity ${index + 1}`,
    category: activity.category || 'Sightseeing',
    duration: activity.duration || 'Flexible',
    rating: activity.rating || 4.5,
    reviews: activity.reviews || 100 + index * 25,

    description:
      activity.description ||
      `${activity.name || 'This activity'} is available near ${activity.location || 'your destination'}.`,

    pricePerPerson: price,
    totalPrice: Number(activity.totalPrice ?? price),
    currency: activity.currency || 'USD',
    location: activity.location || 'London',
    priceLabel: activity.priceLabel || (price === 0 ? 'Free' : `$${price}`),
  }
}

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
    const activities = payload.results || payload.data || []

    return activities.map(mapActivity)
  },
}