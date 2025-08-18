import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router"
import * as apiClient from '../api-client'
import { AiFillStar } from "react-icons/ai"
import { SiTicktick } from "react-icons/si"


const Details = () => {
 const { hotelId } = useParams()

 const { data: hotel } = useQuery({
  queryKey: ['fetchHotelById'],
  queryFn: () => apiClient.fetchHotelById(hotelId as string),
  enabled: !!hotelId
 })

 if (!hotel) return <div className="flex flex-col min-h-screen items-center font-semibold">Loading...</div>

 return (
  <div className="container mx-auto flex flex-col flex-1 py-10 gap-10">
   <div>
    <span className="flex">
     {Array.from({ length: hotel.starRating }).map(() => (
      <AiFillStar className="fill-yellow-400" />
     ))}
    </span>
    <h1 className="text-3xl font-semibold pt-0.5 text-gray-800">{hotel.name}</h1>
   </div>

   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
    {hotel.imageUrls.map((image) => (
     <div className="h-[300px]">
      <img
       src={image}
       alt={hotel.name}
       className="rounded-lg w-full h-full object-cover object-center"
      />
     </div>
    ))}
   </div>

   <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
    {hotel.facilities.map(facility => (
     <div className=" flex items-center justify-center gap-2 text-blue-900 border border-blue-300 rounded-full py-1.5 text-xs font-semibold">
      <SiTicktick className="text-green-800" />
      {facility}
     </div>
    ))}
   </div>

   <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr]">
    <div className="whitespace-pre-line text-gray-900">
     {hotel.description}
    </div>
    <div className="h-fit">
     {/* <GuestInfo /> */}
    </div>
   </div>
  </div>
 )


}

export default Details