import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./manageHotelForm";


const ImagesSection = () => {
 const { register, setValue, watch, formState: { errors } } = useFormContext<HotelFormData>()

 const existingImageUrls = watch('imageUrls')

 const handleDelete = (
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  imageUrl: string
 ) => {
  e.preventDefault()
  setValue('imageUrls', existingImageUrls.filter(url => url !== imageUrl))
 }

 return (
  <div className="px-10">
   <h2 className="text-2xl font-semibold text-gray-700 pb-3">Images</h2>
   {existingImageUrls && (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 items-center justify-center py-8 p-6 sm:px-8 bg-gray-100 rounded-md gap-4">
     {existingImageUrls.map((url) => (
      <div className=" relative group">
       <img src={url} className="min-h-full object-cover rounded-md" />
       <button
        onClick={(e) => handleDelete(e, url)}
        className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 rounded-md text-white font-semibold cursor-pointer">
        <span className="px-4 border-1 border-white rounded-full">
         Delete
        </span>
       </button>
      </div>
     ))}
    </div>
   )}
   <div className="flex justify-center py-8 sm:px-6 lg:px-10 xl:px-15 bg-gray-100 rounded ">
    <label className="border border-blue-700 text-gray-700 rounded cursor-pointer p-2 flex flex-1 mx-6 lg:mx-10 xl:mx-20 bg-white">
     <input type="file" multiple accept="image/*" className="w-52 sm:w-auto cursor-pointer"
      {...register('imageFiles', {
       validate: (imageFiles) => {
        const totalLength = imageFiles.length + (existingImageUrls?.length || 0)
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