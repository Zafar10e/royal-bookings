import { useMutation } from "@tanstack/react-query";
import ManageHotelForm from "../forms/manageHotelForm/manageHotelForm"
import * as apiClient from '../api-client'
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router";

const AddHotel = () => {
 const { showToast } = useAppContext()
 const navigate = useNavigate()

 const { mutate, isPending } = useMutation({
  mutationFn: apiClient.addMyHotel,
  onSuccess: () => {
   showToast({ message: 'Hotel Saved!', type: 'SUCCESS' })
   navigate('/')
  },
  onError: () => {
   showToast({ message: 'Error Saving Hotel!', type: 'ERROR' })
  },
 })

 const handleSave = (hotelFormData: FormData) => {
  mutate(hotelFormData)
 }

 return (
  <ManageHotelForm onSave={handleSave} isPending={isPending} title="Add Hotel" />
 )
}

export default AddHotel;