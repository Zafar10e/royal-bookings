import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router"
import * as apiClient from '../api-client'
import { AiFillStar } from "react-icons/ai"


const Details = () => {
 const { hotelId } = useParams()

 const { data: hotel } = useQuery({
  queryKey: ['fetchHotelById'],
  queryFn: () => apiClient.fetchHotelById(hotelId as string),
  enabled: !!hotelId
 })

 if (!hotel) return <div className="flex flex-col min-h-screen items-center font-semibold">Loading...</div>

 return (
  <div className="space-y-6">
   <span className="flex">
    {Array.from({ length: hotel.starRating }).map(() => (
     <AiFillStar className="fill-yellow-400" />
    ))}
   </span>
  </div>
 )


}

export default Details