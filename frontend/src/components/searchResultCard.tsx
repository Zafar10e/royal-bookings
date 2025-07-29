import { HotelType } from "../../../backend/src/shared/types"


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

    </div>
   </div>
  </div>
 )
}

export default SearchResultCard