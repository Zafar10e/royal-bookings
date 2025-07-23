import { useNavigate, useParams } from 'react-router'
import *  as apiClient from '../api-client'
import { useMutation, useQuery } from '@tanstack/react-query'
import ManageHotelForm from '../forms/manageHotelForm/manageHotelForm'
import { useAppContext } from '../contexts/AppContext'

const EditHotel = () => {
  const { hotelId } = useParams()
  const { showToast } = useAppContext()
  const navigate = useNavigate()

  const { data: hotel } = useQuery({
    queryKey: ['fetchMyHotelById'],
    queryFn: () => apiClient.fetchMyHotelById(hotelId || ''),
    enabled: !!hotelId
  })

  //  const isPending = false

  //  const onSave = (data: FormData) => { console.log(data) }

  const { mutate, isPending } = useMutation({
    mutationFn: apiClient.updateMyHotelById,
    onSuccess: () => {
      showToast({ message: 'Hotel updated successfully!', type: 'SUCCESS' })
      navigate('/')
    },
    onError: (err) => {
      showToast({ message: `${err.message}`, type: 'ERROR' })
    }
  })

  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData)
  }

  return (
    hotel ? <ManageHotelForm onSave={handleSave} isPending={isPending} hotel={hotel} title='Edit Hotel' />
      : <div className='flex justify-center items-center mt-10 font-semibold text-lg'> Loading...</div>
  )

}

export default EditHotel