import { RegisterFormData } from "./pages/register";
import { SignInFormData } from "./pages/sign-in";
import { HotelSearchResponse, HotelType, UserType } from '../../backend/src/shared/types'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export const fetchCurrentUser = async (): Promise<UserType> => {
 const res = await fetch(`${API_BASE_URL}/api/users/me`, {
  credentials: 'include',
 })
 if (!res.ok) {
  throw new Error('Err fetching user')
 }
 return res.json()
}



export const register = async (formData: RegisterFormData) => {

 const res = await fetch(`${API_BASE_URL}/api/users/register`, {
  method: 'POST',
  credentials: 'include',
  headers: {
   'Content-Type': 'application/json',
  },
  body: JSON.stringify(formData)
 })

 const resBody = await res.json()
 if (!res.ok) {
  throw new Error(resBody.message)
 }

 return resBody;
}



export const signIn = async (formData: SignInFormData) => {

 const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
  method: 'POST',
  credentials: 'include',
  headers: {
   'Content-Type': 'application/json'
  },
  body: JSON.stringify(formData)
 })

 const resBody = await res.json()
 if (!res.ok) {
  throw new Error(resBody.message)
 }

 return resBody;
}



export const validateToken = async () => {
 const res = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
  credentials: 'include'
 })

 const resBody = await res.json()
 if (!res.ok) {
  throw new Error(resBody.message)
 }

 return resBody;
}



export const signOut = async () => {
 const res = await fetch(`${API_BASE_URL}/api/auth/logout`, {
  method: 'POST',
  credentials: 'include'
 })

 const resBody = await res.json()

 if (!res.ok) {
  throw new Error('Sign out Err:' + resBody.message)
 }

 return resBody;
}


export const addMyHotel = async (hotelFormData: FormData) => {
 const res = await fetch(`${API_BASE_URL}/api/my-hotels`, {
  method: 'POST',
  credentials: 'include',
  body: hotelFormData
 })

 const resBody = await res.json()

 if (!res.ok) {
  throw new Error(resBody.message)
 }

 return resBody;
}


export const fetchMyHotels = async (): Promise<HotelType[]> => {
 const res = await fetch(`${API_BASE_URL}/api/my-hotels`, {
  credentials: 'include'
 })

 const resBody = await res.json()

 if (!res.ok) {
  throw new Error(resBody.message)
 }

 return resBody
}


export const fetchMyHotelById = async (hotelId: string): Promise<HotelType> => {
 const res = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelId}`, {
  credentials: 'include'
 })

 const resBody = await res.json()

 if (!res.ok) {
  throw new Error(resBody.message)
 }

 return resBody
}


export const updateMyHotelById = async (hotelFormData: FormData) => {
 const res = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelFormData.get('hotelId')}`,
  {
   method: 'PUT',
   body: hotelFormData,
   credentials: 'include'
  }
 )

 const resBody = await res.json()

 if (!res.ok) {
  throw new Error(resBody.message)
 }

 return resBody
}


export type SearchParams = {
 destination?: string
 checkIn?: string
 checkOut?: string
 adultCount?: string
 childCount?: string
 page?: string
 facilities?: string[]
 types?: string[]
 stars?: string[]
 maxPrice?: string
 sortOption?: string
}

export const searchHotels = async (searchParams: SearchParams): Promise<HotelSearchResponse> => {

 const queryParams = new URLSearchParams()

 queryParams.append('destination', searchParams.destination || '')
 queryParams.append('checkIn', searchParams.checkIn || '')
 queryParams.append('checkOut', searchParams.checkOut || '')
 queryParams.append('adultCount', searchParams.adultCount || '')
 queryParams.append('childCount', searchParams.childCount || '')
 queryParams.append('page', searchParams.page || '')
 queryParams.append('maxPrice', searchParams.maxPrice || '')
 queryParams.append('sortOption', searchParams.sortOption || '')

 searchParams.facilities?.forEach(facility => queryParams.append('facilities', facility))
 searchParams.types?.forEach(type => queryParams.append('types', type))
 searchParams.stars?.forEach(star => queryParams.append('stars', star))

 const res = await fetch(`${API_BASE_URL}/api/hotels/search?${queryParams}`)

 const resBody = await res.json()

 if (!res.ok) {
  throw new Error(resBody.message)
 }

 return resBody
}


export const fetchHotelById = async (hotelId: string): Promise<HotelType> => {
 const res = await fetch(`${API_BASE_URL}/api/hotels/${hotelId}`)

 const resBody = await res.json()

 if (!res.ok) {
  throw new Error(resBody.message)
 }

 return resBody
}

