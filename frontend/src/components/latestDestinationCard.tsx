import { Link } from "react-router"
import { HotelType } from "../../../backend/src/shared/types"

type Props = {
 hotel: HotelType
}

const LatestDestinationCard = ({ hotel }: Props) => {

 return (
  <Link to={`/details/${hotel._id}`}
   className="relative cursor-pointer overflow-hidden rounded-lg"
  >
   <div className="h-[300px]">
    <img
     src={hotel.imageUrls[0]}
     className="w-full h-full object-cover object-center"
    />
   </div>
   <div className="absolute bottom-0 p-4 bg-black/40 w-full rounded-b-lg">
    <span className="text-white font-semibold tracking-tight text-2xl">
     {hotel.name}
    </span>
   </div>
  </Link>
 )
}

export default LatestDestinationCard