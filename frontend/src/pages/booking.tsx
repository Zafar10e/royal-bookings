import { useQuery } from "@tanstack/react-query"
import * as apiClient from '../api-client'
import BookingForm from "../forms/bookingForm/bookingForm"



const Booking = () => {
 const { data: currentUser } = useQuery({
  queryKey: ['fetchCurrentUser'],
  queryFn: apiClient.fetchCurrentUser
 })

 return (
  <div className="grid sm:grid-cols-[1fr_2fr]">
   <div className="bg-green-200">Booking Details Summary</div>
   {currentUser &&
    <BookingForm currentUser={currentUser} />
   }
  </div>
 )
}

export default Booking