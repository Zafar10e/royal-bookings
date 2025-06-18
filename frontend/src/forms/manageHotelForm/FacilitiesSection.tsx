import { useFormContext } from "react-hook-form";
import { hotelFacilities } from "../../config/hotel-options-config"
import { HotelFormData } from "./manageHotelForm";


const FacilitiesSection = () => {
 const { register, formState: { errors } } = useFormContext<HotelFormData>()

 return (
  <div className="px-10">
   <h2 className="text-2xl text-gray-700 font-semibold pb-3">Facilities</h2>
   <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 pl-1">
    {hotelFacilities.map(facility => (
     <label key={facility} className="flex items-center text-sm text-gray-700 gap-1 font-semibold">
      <input type="checkbox" value={facility} className="size-5"
       {...register('facilities', {
        validate: (facilities) => {
         if (facilities && facilities.length > 0) {
          return true
         } else {
          return '*Atleast one facility is required!'
         }
        }
       })}
      />
      {facility}
     </label>
    ))}
   </div>
   {errors.facilities && (
    <span className="text-red-600 text-xs font-semibold flex justify-end p-3">{errors.facilities.message}</span>
   )}
  </div>
 )

}

export default FacilitiesSection;