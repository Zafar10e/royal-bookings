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
 const { handleSubmit, register } = useForm<BookingFormData>({
  defaultValues: {
   firstName: currentUser.firstName,
   lastName: currentUser.lastName,
   email: currentUser.email
  }
 })

 return (
  <form className="flex flex-col flex-1 gap-3 rounded-lg border border-slate-300 p-5">
   <h3 className="text-xl text-gray-800 font-bold">Confirm Your Datails</h3>
   <div className="flex flex-1 gap-3">
    <label className="flex flex-1 flex-col text-gray-700 text-sm font-semibold">
     First Name
     <input
      className="flex border border-gray-300 bg-gray-200 rounded p-2 text-normal"
      type="text"
      readOnly
      disabled
      {...register('firstName')}
     />
    </label>
    <label className="flex flex-1 flex-col text-gray-700 text-sm font-semibold">
     Last Name
     <input
      className="border border-gray-300 bg-gray-200 rounded font-normal p-2"
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
     className="flex border border-gray-300 rounded font-normal text-gray-700 p-2 bg-gray-200"
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