import { useQuery } from "@tanstack/react-query"
import * as apiClient from '../api-client'
import BookingForm from "../forms/bookingForm/bookingForm"
import { useSearchContext } from "../contexts/searchContext"
import { useParams } from "react-router"
import { useEffect, useState } from "react"
import BookingDetailsSummary from "../components/bookingDetailsSummary"


const Booking = () => {
 const search = useSearchContext()
 const { hotelId } = useParams()

 const [numberOfNights, setNumberOfNights] = useState<number>(0)

 useEffect(() => {
  if (search.checkIn && search.checkOut) {
   const nights = Math.abs(search.checkOut.getTime() - search.checkIn.getTime()) / (1000 * 60 * 60 * 24)

   setNumberOfNights(Math.ceil(nights))
  }
 }, [search.checkIn, search.checkOut])

 const { data: hotel } = useQuery({
  queryKey: ['fetchHotelById'],
  queryFn: () => apiClient.fetchHotelById(hotelId as string),
  enabled: !!hotelId
 })

 const { data: currentUser } = useQuery({
  queryKey: ['fetchCurrentUser'],
  queryFn: apiClient.fetchCurrentUser
 })

 return (
  <div className="grid sm:grid-cols-[1fr_2fr]">
   <BookingDetailsSummary
    checkIn={search.checkIn}
    checkOut={search.checkOut}
    adultCount={search.adultCount}
    childCount={search.childCount}
    numberOfNights={numberOfNights}
    hotel={hotel}
   />
   {currentUser &&
    <BookingForm currentUser={currentUser} />
   }
  </div>
 )
}

export default Booking