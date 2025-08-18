import { AiFillStar } from "react-icons/ai"
import { HotelType } from "../../../backend/src/shared/types"
import { Link } from "react-router"


type Props = {
  hotel: HotelType
}

const SearchResultCard = ({ hotel }: Props) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[2fr_3.5fr] border border-slate-300 rounded-lg p-4 gap-4">
      <div className="w-full h-[300px] rounded-md">
        <img src={hotel.imageUrls[0]}
          className="w-full rounded-md h-full object-cover object-center"
        />
      </div>
      <div className="grid grid-rows-[1fr_2fr_1fr]">
        <div>
          <div className="flex items-center">
            <span className="flex">
              {Array.from({ length: hotel.starRating }).map(() => (
                <AiFillStar className="fill-yellow-400" />
              ))}
            </span>
            <span className="ml-2 text-sm">{hotel.type}</span>
          </div>
          <Link to={`/details/${hotel._id}`} className="text-2xl font-semibold cursor-pointer pt-2">{hotel.name}</Link>
        </div>

        <div>
          <div className="line-clamp-4">{hotel.description}</div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 whitespace-nowrap items-end">
          <div className="flex gap-1 items-center">
            {hotel.facilities.slice(0, 3).map((facility) => (
              <span className="bg-slate-200 px-2 py-1.25 rounded-full
       font-semibold text-xs whitespace-nowrap">
                {facility}
              </span>
            ))}
            <span className="text-xs">
              {hotel.facilities.length > 3 && ` +${hotel.facilities.length - 3} more..`}
            </span>
          </div>
          <div className="flex flex-col items-end gap-1 text-gray-900">
            <span className="font-semibold px-1">${hotel.pricePerNight}<span className="text-xs">/night</span></span>
            <Link to={`/details/${hotel._id}`} className="bg-blue-700 text-white px-2 py-1
       rounded font-semibold max-w-fit hover:bg-blue-600">View More</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchResultCard