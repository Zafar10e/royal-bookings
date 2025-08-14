import { useQuery } from "@tanstack/react-query"
import { useSearchContext } from "../contexts/searchContext"
import * as apiClient from '../api-client'
import { useState } from "react"
import SearchResultCard from "../components/searchResultCard"
import Pagination from "../components/Pagination"
import StarRatingFilter from "../components/starRatingFilter"
import HotelTypesFilter from "../components/HotelTypesFilter"

const Search = () => {
  const search = useSearchContext()
  const [page, setPage] = useState<number>(1)
  const [selectedStars, setSelectedStars] = useState<string[]>([])
  const [selectedHotelTypes, setSelectedHotelTypes] = useState<string[]>([])

  const searchParams = {
    destination: search.destination,
    checkIn: search.checkIn.toISOString(),
    checkOut: search.checkOut.toISOString(),
    adultCount: search.adultCount.toString(),
    childCount: (search.childCount > 0) ? search.childCount.toString() : '',
    page: page.toString(),
    stars: selectedStars,
    types: selectedHotelTypes,
  }

  const { data: hotelSearchData } = useQuery({
    queryKey: ['searchHotels', searchParams],
    queryFn: () => apiClient.searchHotels(searchParams)
  })

  const handleStarsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const starRating = e.target.value

    setSelectedStars(prevStars =>
      e.target.checked
        ? [...prevStars, starRating]
        : prevStars.filter(star => star !== starRating)
    )
  }

  const handleHotelTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hotelType = e.target.value

    setSelectedHotelTypes((prevHotelType) =>
      e.target.checked
        ? [...prevHotelType, hotelType]
        : prevHotelType.filter((hotlType) => hotlType !== hotelType)
    )
  }

  return (
    <div className="grid grid-col-1 lg:grid-cols-[250px_1fr] gap-5 pt-10 lg:pt-15">
      <div className="rounded-lg border border-slate-300 p-5 h-fit lg:sticky top-10">
        <div className="space-y-5">
          <h3 className="text-lg font-semibold text-gray-800 border-b border-slate-300 pb-5">
            Filter by:
          </h3>
          <StarRatingFilter selectedStars={selectedStars} onChange={handleStarsChange} />
          <HotelTypesFilter
            selectedHotelTypes={selectedHotelTypes}
            onChange={handleHotelTypeChange}
          />
        </div>
      </div>
      <div className="flex flex-col gap-5 rounded-lg">
        <div className="flex justify-between items-center">
          <span className="text-xl pl-5 text-gray-800 font-semibold">
            "{hotelSearchData?.pagination.total}" Hotels found..
            {search.destination ? ` in ${search.destination}` : ''}
          </span>
          {/* todo sort options */}
        </div>
        {hotelSearchData?.data.map(hotel => (
          <SearchResultCard hotel={hotel} />
        ))}
        <div className="py-8">
          <Pagination
            page={hotelSearchData?.pagination.page || 1}
            pages={hotelSearchData?.pagination.pages || 1}
            onPageChange={(page) => setPage(page)}
          />
        </div>
      </div>
    </div>
  )
}

export default Search;