import { FormProvider, useForm } from "react-hook-form"
import DetailsSection from "./detailsSection"
import TypeSection from "./typeSection"
import FacilitiesSection from "./FacilitiesSection"
import GuestsSection from "./GuestsSection"
import ImagesSection from "./ImagesSection"
import { HotelType } from "../../../../backend/src/shared/types"
import { useEffect } from "react"

export type HotelFormData = {
 name: string
 city: string
 country: string
 description: string
 type: string
 pricePerNight: number
 starRating: number
 facilities: string[]
 imageFiles: FileList
 imageUrls: string[]
 adultCount: number
 childCount: number
}

type Props = {
 onSave: (hotelFormData: FormData) => void
 isPending: boolean
 hotel?: HotelType
 title: string
}

const ManageHotelForm = ({ onSave, isPending, hotel, title }: Props) => {
 const formMethods = useForm<HotelFormData>()
 const { handleSubmit, reset } = formMethods

 {
  hotel && (
   useEffect(() => {
    reset(hotel)
   }, [hotel])
  )
 }


 const onSubmit = handleSubmit((formDataJson: HotelFormData) => {
  const formData = new FormData()
  formData.append('hotelId', hotel?._id.toString() || '')
  formData.append('name', formDataJson.name)
  formData.append('city', formDataJson.city)
  formData.append('country', formDataJson.country)
  formData.append('pricePerNight', formDataJson.pricePerNight.toString())
  formData.append('starRating', formDataJson.starRating.toString())
  formData.append('description', formDataJson.description)
  formData.append('type', formDataJson.type)
  formData.append('adultCount', formDataJson.adultCount.toString())
  formData.append('childCount', formDataJson.childCount?.toString())

  formDataJson.facilities.forEach((facility, i) => {
   formData.append(`facilities[${i}]`, facility)
  })

  Array.from(formDataJson.imageFiles).forEach(imageFile => {
   formData.append('imageFiles', imageFile)
  })

  onSave(formData)
 })

 return (
  <FormProvider {...formMethods}>
   <form onSubmit={onSubmit} className="container mx-auto flex flex-col flex-1 gap-10 py-10">
    <h1 className="text-3xl font-bold text-gray-700 px-10">{title}</h1>
    <DetailsSection />
    <TypeSection />
    <FacilitiesSection />
    <GuestsSection />
    <ImagesSection />
    <div className="flex justify-end px-10">
     <span className="border border-blue-800 p-0.5 rounded-md">
      <button type="submit" disabled={isPending} className="bg-blue-700 rounded py-1 px-5 text-white font-semibold text-lg hover:bg-blue-600 cursor-pointer disabled:bg-gray-500">
       {isPending ? 'Saving...' : 'Save Hotel'}
      </button>
     </span>
    </div>
   </form>
  </FormProvider>
 )
}

export default ManageHotelForm;