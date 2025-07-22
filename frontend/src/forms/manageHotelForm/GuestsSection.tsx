import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./manageHotelForm";


const GuestsSection = () => {
 const { register, formState: { errors } } = useFormContext<HotelFormData>()

 return (
  <div className="px-10">
   <h2 className="text-2xl text-gray-700 font-semibold pb-3">Guests</h2>
   <div className="grid grid-cols-1 sm:grid-cols-2 p-6 lg:px-10 xl:px-15 gap-6 xl:gap-10 bg-gray-100 rounded">
    <label className="flex flex-col text-gray-700 font-semibold">
     Adults:
     <input type="number" min={1} max={100} placeholder="eg: 1" className="border border-blue-700 focus:border-2 focus:outline-none rounded w-full p-2 font-normal bg-white"
      {...register('adultCount', { required: '*This field is required!' })}
     />
     {errors.adultCount && (
      <span className="text-red-600 text-xs flex justify-end -mt-7 mb-3 px-3">{errors.adultCount.message}</span>
     )}
    </label>
    <label className="flex flex-col text-gray-700 font-semibold">
     Childs:
     <input type="number" min={0} max={100} defaultValue={0} placeholder="eg: 0" className="border border-blue-700 rounded p-2 focus:border-2 focus:outline-none font-normal bg-white"
      {...register('childCount')}
     />
     {errors.childCount && (
      <span className="text-red-600 text-xs flex justify-end -mt-7 mb-3 px-3">{errors.childCount.message}</span>
     )}
    </label>
   </div>
  </div>
 )
}

export default GuestsSection;