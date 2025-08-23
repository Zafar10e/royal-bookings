import DatePicker from "react-datepicker"
import { useForm } from "react-hook-form"
import { useSearchContext } from "../../contexts/searchContext"
import { useAppContext } from "../../contexts/AppContext"
import { useLocation, useNavigate } from "react-router"

type Props = {
 hotelId: string
 pricePerNight: number
}

type GuestInfoFormData = {
 checkIn: Date
 checkOut: Date
 adultCount: number
 childCount: number
}

const GuestInfoForm = ({ hotelId, pricePerNight }: Props) => {
 const searchContext = useSearchContext()
 const { isLoggedIn } = useAppContext()
 const navigate = useNavigate()
 const location = useLocation()

 const { watch, register, handleSubmit, setValue, formState: { errors } } = useForm<GuestInfoFormData>({
  defaultValues: {
   checkIn: searchContext.checkIn,
   checkOut: searchContext.checkOut,
   adultCount: searchContext.adultCount,
   childCount: searchContext.childCount
  }
 })

 const checkIn = watch('checkIn')
 const checkOut = watch('checkOut')
 const minDate = new Date()
 const maxDate = new Date()
 maxDate.setFullYear(maxDate.getFullYear() + 1)

 const onSignInClick = (data: GuestInfoFormData) => {
  searchContext.saveSearchValues(
   '',
   data.checkIn,
   data.checkOut,
   data.adultCount,
   data.childCount
  )
  navigate('/sign-in', { state: { from: location } })
  console.log(location)
 }

 const onSubmit = (data: GuestInfoFormData) => {
  searchContext.saveSearchValues(
   '',
   data.checkIn,
   data.checkOut,
   data.adultCount,
   data.childCount
  )
  navigate(`/hotel/${hotelId}/booking`)
 }

 return (
  <div className="flex flex-col p-5 bg-blue-100 gap-5 rounded-lg">
   <h3 className="pl-2 text-md font-semibold">
    ${pricePerNight}
    <span className="text-sm font-normal"> / night</span>
   </h3>
   <form
    onSubmit={isLoggedIn
     ? handleSubmit(onSubmit)
     : handleSubmit(onSignInClick)}>
    <div className="grid grid-cols-1 gap-4 items-center">
     <div>
      <DatePicker
       required
       selected={checkIn}
       onChange={date => setValue('checkIn', date as Date)}
       selectsStart
       startDate={checkIn}
       endDate={checkOut}
       minDate={minDate}
       maxDate={maxDate}
       placeholderText="Check-in Date"
       className="min-w-full bg-white px-3 py-1.5 focus:outline-none rounded-md"
       wrapperClassName="min-w-full"
      />
     </div>
     <div>
      <DatePicker
       required
       selected={checkOut}
       onChange={date => setValue('checkOut', date as Date)}
       selectsStart
       startDate={checkIn}
       endDate={checkOut}
       minDate={minDate}
       maxDate={maxDate}
       placeholderText="Check-out Date"
       className="min-w-full bg-white px-3 py-1.5 rounded-md focus:outline-none"
       wrapperClassName="min-w-full"
      />
     </div>

     <div className="flex flex-1 gap-3">
      <label className="flex flex-1 flex-col text-sm">
       Adults:
       <input
        className="w-full px-3 py-1.5 bg-white rounded-md focus:outline-none"
        type="number"
        min={1}
        max={20}
        {...register('adultCount', {
         required: 'This field is required!',
         min: {
          value: 1,
          message: 'There must be atleast one adult'
         },
         valueAsNumber: true
        })}
       />
      </label>
      <label className="flex flex-1 flex-col text-gray-800 text-sm">
       Childs:
       <input
        className="w-full bg-white px-3 py-1.5 rounded-md focus:outline-none"
        type="number"
        min={0}
        max={20}
        {...register('childCount', {
         valueAsNumber: true
        })}
       />
      </label>
      {errors.adultCount && (
       <span className="flex flex-1 text-end text-red-500 font-semibold text-xs">
        {errors.adultCount.message}
       </span>
      )}
     </div>
     {isLoggedIn
      ? (<button className="bg-blue-600 hover:bg-blue-500 rounded-md text-white text-lg font-semibold cursor-pointer py-1.5 mt-2 ">Book Now</button>)
      : (<button className="bg-blue-600 hover:bg-blue-500 rounded-md py-1.5 text-white text-lg font-semibold mt-2 cursor-pointer">Sign in to Book</button>)
     }
    </div>
   </form>
  </div>
 )
}

export default GuestInfoForm