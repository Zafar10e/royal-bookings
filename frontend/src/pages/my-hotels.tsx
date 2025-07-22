import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router"
import * as apiClient from '../api-client'
import { BsBuilding, BsMap, BsStar } from "react-icons/bs"
import { BiHotel, BiMoney } from "react-icons/bi"

const MyHotels = () => {

 const { data: hotelData } = useQuery({
  queryKey: ['fetchMyHotels'],
  queryFn: apiClient.fetchMyHotels,
 })

 if (!hotelData) {
  return <div className="flex flex-col flex-1 items-center justify-center text-xl font-semibold">You does't own any hotels yet...!!!</div>
 }

 return (
  <div className="flex flex-col flex-1 container mx-auto gap-8 my-10">
   <div className="flex justify-between">
    <h1 className="text-3xl font-bold text-gray-700">My Hotels</h1>
    <span className=" border border-blue-800 p-0.5 mt-1 rounded-md ">
     <Link to='/add-hotel' className="flex bg-blue-700 text-white font-semibold py-1.25  px-2.5 rounded hover:bg-blue-600">Add New Hotel</Link>
    </span>
   </div>

   <div className="flex flex-col gap-5">
    {hotelData.map(hotel => (
     <div className="flex flex-col justify-between border border-blue-500 text-gray-900 rounded-lg p-4 gap-4">
      <h2 className="text-xl font-semibold">{hotel.name}</h2>
      <div className="whitespace-pre-line">{hotel.description}</div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
       <div className="border border-blue-300 rounded-full p-1.5 flex items-center justify-around">
        <BsMap className="text-blue-700" />
        <span className="text-sm">
         {hotel.country}
        </span>
       </div>
       <div className="border border-blue-300 rounded-full p-1.5 flex items-center justify-around">
        <BsMap className="text-blue-700" />
        <span className="text-sm">
         {hotel.city}
        </span>
       </div>
       <div className="border border-blue-300 rounded-full p-1.5 flex items-center justify-around">
        <BsBuilding className="text-blue-700" />
        <span className="text-sm">
         {hotel.type}
        </span>
       </div>
       <div className="border border-blue-300 rounded-full p-1.5 flex items-center justify-around">
        <BiMoney className="text-blue-700" />
        {/* {`$ ${hotel.pricePerNight} / night`} */}
        <span className="text-sm">
         ${hotel.pricePerNight} / night
        </span>
       </div>
       <div className="border border-blue-300 p-1.5 rounded-full flex items-center justify-around">
        <BiHotel className="text-blue-700" />
        <span className="text-sm">
         {hotel.adultCount} adults
        </span>
       </div>
       <div className="border border-blue-300 p-1.5 rounded-full flex items-center justify-around">
        <BiHotel className="text-blue-700" />
        <span className="text-sm">
         {hotel.chlidCount} childs
        </span>
       </div>
       <div className="border border-blue-300 rounded-full p-1.5 flex items-center justify-around">
        <BsStar className="text-blue-700" />
        <span className="text-sm">
         {hotel.starRating} Stars
        </span>
       </div>
      </div>
      <div className="flex justify-end">
       <span className="border border-blue-800 rounded-full p-0.5">
        <Link to={`/edit-hotel/${hotel._id}`} className="flex py-1 px-3 rounded-full bg-blue-700 text-white font-semibold hover:bg-blue-600">Edit Details</Link>
       </span>
      </div>
     </div>
    ))}
   </div>
  </div>
 )
}

export default MyHotels