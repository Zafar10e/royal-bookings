import { useFormContext } from "react-hook-form"
import { HotelFormData } from "./manageHotelForm"


const DetailsSection = () => {
 const { register, formState: { errors } } = useFormContext<HotelFormData>()

 return (
  <div className="flex flex-col gap-3 px-10">
   <h1 className="text-3xl font-bold pb-3 text-gray-700">Add Hotel</h1>
   <label className="flex flex-col text-gray-700 font-semibold">
    Name:
    <input className={`border focus:border-2 ${errors.name ? 'border-red-500' : 'border-blue-700'} p-2 rounded font-normal focus:outline-none`} {...register('name', { required: '*Name is required!' })} />
    {errors.name && (
     <span className="text-red-600 text-xs flex justify-end -mt-7 mb-3 px-3">{errors.name.message}</span>
    )}
   </label>

   <div className="flex flex-col md:flex-row gap-4">
    <label className="flex flex-col flex-1 text-gray-700 font-semibold">
     City:
     <input className={`border focus:border-2 ${errors.city ? 'border-red-500' : 'border-blue-700'} p-2 rounded font-normal focus:outline-none`}
      {...register('city', { required: '*City is required!' })} />
     {errors.city && (
      <span className="text-red-600 text-xs flex justify-end -mt-7 mb-3 px-3">{errors.city.message}</span>
     )}
    </label>
    <label className="flex flex-col flex-1 text-gray-700 font-semibold">
     Country:
     <input className={`border focus:border-2 ${errors.country ? 'border-red-500' : 'border-blue-700'} rounded p-2 font-normal focus:outline-none`}
      {...register('country', { required: '*Country is required!' })}
     />
     {errors.country && (
      <span className="text-red-600 text-xs flex justify-end -mt-7 mb-3 px-3">{errors.country.message}</span>
     )}
    </label>
   </div>

   <div className="flex flex-col md:flex-row gap-4">
    <label className="flex flex-col flex-1 text-gray-700 font-semibold">
     Price per night in $s:
     <input type="number" min={10} max={10000} placeholder="eg: 10" className={`border focus:border-2 ${errors.pricePerNight ? 'border-red-500' : 'border-blue-700'} font-normal rounded p-2 focus:outline-none`}
      {...register('pricePerNight', { required: '*Price per night is required!' })}
     />
     {errors.pricePerNight && (
      <span className="text-red-600 text-xs flex justify-end -mt-7 mb-3 px-3">{errors.pricePerNight.message}</span>
     )}
    </label>
    <label className="flex flex-col flex-1 text-gray-700 font-semibold">
     Stars as rating:
     <select defaultValue={4} className={`border focus:border-2 ${errors.starRating ? 'border-red-500' : 'border-blue-700'} rounded p-2 font-normal focus:outline-none `}
      {...register('starRating')}
     >
      <option value='' disabled>Select as rating</option>
      {[1, 2, 3, 4, 5].map(num => (
       <option key={num} value={num}>{num}</option>
      ))}
     </select>
    </label>
   </div>

   <label className="flex flex-col text-gray-700 font-semibold">
    Description:
    <textarea rows={4} placeholder="A nice description of your Hotel..." className={`border focus:border-2 ${errors.description ? 'border-red-500' : 'border-blue-700'} rounded font-normal p-2 focus:outline-none`}
     {...register('description', { required: '*Description is required!' })}
    />
    {errors.description && (
     <span className="text-red-600 text-xs flex justify-end -mt-7 mb-3 px-3">{errors.description.message}</span>
    )}
   </label>

  </div>
 )

}

export default DetailsSection;