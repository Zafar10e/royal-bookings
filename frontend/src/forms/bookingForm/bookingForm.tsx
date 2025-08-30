import { useForm } from "react-hook-form"
import { UserType } from "../../../../backend/src/shared/types"

type Props = {
 currentUser: UserType
}

type BookingFormData = {
 firstName: string
 lastName: string
 email: string
}


const BookingForm = ({ currentUser }: Props) => {
 const { handleSubmit, register } = useForm<BookingFormData>()

 return (
  <form className="flex flex-col flex-1 gap-3 rounded-lg border border-slate-300 p-5">
   <h3 className="text-xl font-bold">Confirm Your Datails</h3>
   <div className="flex flex-1 gap-3">
    <label className="flex flex-1 flex-col text-gray-700 text-sm font-semibold">
     First Name
     <input
      className="flex flex-1 border border-gray-300 bg-gray-200 rounded px-2 py-1.5 text-normal focus:outline- focus:border-2"
      type="text"
      readOnly
      disabled
      {...register('firstName')}
     />
    </label>
    <label className="flex flex-1 flex-col text-gray-700 text-sm font-semibold">
     Last Name
     <input
      className="flex flex-1 border border-gray-300 bg-gray-200 rounded font-normal focus:outline-none focus:border-2 px-2 py-1.5"
      type="text"
      readOnly
      disabled
      {...register('lastName')}
     />
    </label>
   </div>
   <label className="flex flex-1 flex-col">
    Email
    <input
     className="flex flex-1 border border-gray-300 rounded font-normal text-gray-700 focus:outline-none focus:border-2 px-2 py-1.5 bg-gray-200"
     type="email"
     readOnly
     disabled
     {...register('email')}
    />
   </label>
  </form>
 )
}

export default BookingForm