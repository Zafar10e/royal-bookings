import { useParams } from 'react-router'
import *  as apiClient from '../api-client'
import { useQuery } from '@tanstack/react-query'
import ManageHotelForm from '../forms/manageHotelForm/manageHotelForm'

const EditHotel = () => {
 const { hotelId } = useParams()

 const { data: hotel } = useQuery({
  queryKey: ['fetchMyHotelById'],
  queryFn: () => apiClient.fetchMyHotelById(hotelId || ''),
  enabled: !!hotelId
 })

 const isPending = false

 const onSave = (data: FormData) => { console.log(data) }

 return (
  hotel ? <ManageHotelForm onSave={onSave} isPending={isPending} hotel={hotel} title='Edit Hotel' />
   : <div className='flex justify-center items-center mt-10 font-semibold text-lg'> Loading...</div>
 )

}

export default EditHotel