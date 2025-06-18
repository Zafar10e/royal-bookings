import { useFormContext } from 'react-hook-form'
import { hotelTypes } from '../../config/hotel-options-config'
import { HotelFormData } from './manageHotelForm'

const TypeSection = () => {
 const { register, watch, formState: { errors } } = useFormContext<HotelFormData>()
 const typeWatch = watch('type')

 return (
  <div className='px-10'>
   <h2 className='text-gray-700 text-2xl font-semibold pb-5'>Type</h2>
   <div className='grid grid-cols-3 sm:grid-cols-5 gap-2'>
    {hotelTypes.map((type) => (
     <label key={type} className={`text-gray-700 font-semibold rounded-full p-2 text-xs cursor-pointer flex items-center justify-center border border-gray-400 ${typeWatch === type ? 'bg-blue-600 text-white' : 'bg-gray-100'} `}>
      <input type='radio' value={type} {...register('type', { required: '*Atleast one type is required!' })}
       className='hidden'
      />
      <span className={`${typeWatch === type ? 'font-bold' : ''}`}>{type}</span>
     </label>
    ))}
   </div>
   {errors.type && (
    <span className='text-red-600 text-xs font-semibold flex justify-end p-3'>{errors.type.message}</span>
   )}
  </div>
 )
}

export default TypeSection;