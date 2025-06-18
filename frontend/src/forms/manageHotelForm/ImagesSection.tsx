import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./manageHotelForm";


const ImagesSection = () => {
 const { register, formState: { errors } } = useFormContext<HotelFormData>()

 return (
  <div className="px-10">
   <h2 className="text-2xl font-semibold text-gray-700 pb-3">Images</h2>
   <div className="flex justify-center py-8 sm:px-6 lg:px-10 xl:px-15 bg-gray-100 rounded ">
    <label className="border border-blue-700 text-gray-700 rounded p-2 flex flex-1 mx-6 lg:mx-10 xl:mx-20 bg-white">
     <input type="file" multiple accept="image/*" className="w-52 sm:w-auto"
      {...register('imageFiles', {
       validate: (imageFiles) => {
        const totalLength = imageFiles.length
        if (totalLength === 0) {
         return '*Atleast one image required!'
        }

        if (totalLength > 6) {
         return '*Max images not more than six!'
        }

        return true
       }
      })}
     />
    </label>
   </div>
   {errors.imageFiles && (
    <span className="text-red-600 text-xs font-semibold flex justify-end p-2">{errors.imageFiles.message}</span>
   )}
  </div>

 )
}

export default ImagesSection;