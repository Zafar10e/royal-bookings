import { useQuery } from '@tanstack/react-query'
import * as apiClient from '../api-client'
import LatestDestinationCard from '../components/latestDestinationCard'

const Home = () => {
 const { data: hotels } = useQuery({
  queryKey: ['fetchQuery'],
  queryFn: () => apiClient.fetchHotels()
 })

 const topRowHotels = hotels?.slice(0, 2) || []
 const bottomRowHotels = hotels?.slice(2)

 return (
  <div className='space-y-3 py-8 '>
   <div className='text-3xl font-semibold'>
    Latest Destinations
   </div>
   <p>Most recent destinations added by our hosts</p>
   <div className='flex flex-1 flex-col gap-6'>
    <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
     {topRowHotels.map(hotel => (
      <LatestDestinationCard hotel={hotel} />
     ))}
    </div>
    <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
     {bottomRowHotels?.map(hotel => (
      <LatestDestinationCard hotel={hotel} />
     ))}
    </div>
   </div>
  </div>

 )
}

export default Home