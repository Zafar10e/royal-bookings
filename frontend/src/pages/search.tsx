import { useQuery } from "@tanstack/react-query"
import { useSearchContext } from "../contexts/searchContext"
import * as apiClient from '../api-client'
import { useState } from "react"
import SearchResultCard from "../components/searchResultCard"
import Pagination from "../components/Pagination"

const Search = () => {
 const search = useSearchContext()
 const [page, setPage] = useState<number>(1)

 const searchParams = {
  destination: search.destination,
  checkIn: search.checkIn.toISOString(),
  checkOut: search.checkOut.toISOString(),
  adultCount: search.adultCount.toString(),
  childCount: search.childCount.toString(),
  page: page.toString()
 }

 const { data: hotelSearchData } = useQuery({
  queryKey: ['searchHotels', searchParams],
  queryFn: () => apiClient.searchHotels(searchParams)
 })

 console.log(hotelSearchData)

 return (
  <div className="grid grid-col-1 lg:grid-cols-[250px_1fr] gap-5 pt-10 lg:pt-15">
   <div className="rounded-lg border border-slate-300 p-5 h-fit lg:sticky top-10 bg-gray-50">
    <div className="space-y-5">
     <h3 className="text-lg font-semibold text-gray-800 border-b border-slate-300 pb-5">
      Filter by:
     </h3>
     {/* todo filters */}
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