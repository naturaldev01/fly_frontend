import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Flight API
export const flightApi = {
  search: async (params: {
    originCode: string;
    destinationCode: string;
    departureDate: string;
    returnDate?: string;
    tripType: 'one_way' | 'round_trip';
    adults: number;
    children?: number;
    infants?: number;
    cabinClass?: string;
  }) => {
    const response = await api.get('/flights/search', { params });
    return response.data;
  },

  price: async (flightOffer: any) => {
    const response = await api.post('/flights/price', flightOffer);
    return response.data;
  },
};

// Booking API
export const bookingApi = {
  create: async (data: {
    flightOffer: any;
    passengers: any[];
    contactEmail: string;
    contactPhone: string;
    specialRequests?: string;
  }) => {
    const response = await api.post('/bookings', data);
    return response.data;
  },

  get: async (reference: string) => {
    const response = await api.get(`/bookings/${reference}`);
    return response.data;
  },

  getUserBookings: async (userId: string) => {
    const response = await api.get('/bookings', { params: { userId } });
    return response.data;
  },
};

// Airport API
export const airportApi = {
  search: async (query: string) => {
    const response = await api.get('/airports/search', { params: { q: query } });
    return response.data;
  },

  getAll: async () => {
    const response = await api.get('/airports');
    return response.data;
  },
};

