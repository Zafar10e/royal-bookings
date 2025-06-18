import { RegisterFormData } from "./pages/register";
import { SignInFormData } from "./pages/sign-in";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';


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
 const res = await fetch(`${API_BASE_URL}/api/auth/validate-token`, { credentials: 'include' })

 const resBody = await res.json()
 if (!res.ok) {
  throw new Error(resBody.message)
 }

 return resBody;
}



export const signOut = async () => {
 const res = await fetch(`${API_BASE_URL}/api/auth/logout`, {
  credentials: 'include',
  method: 'POST'
 })

 const resBody = await res.json()

 if (!res.ok) {
  throw new Error('Error during sign out')
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
  throw new Error('Failed to add hotel: ' + resBody.message)
 }

 return resBody;
}