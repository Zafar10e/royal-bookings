import { useForm } from "react-hook-form"
import { PaymentIntentResponse, UserType } from "../../../../backend/src/shared/types"
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { StripeCardElement } from "@stripe/stripe-js"
import { useSearchContext } from "../../contexts/searchContext"
import { useParams } from "react-router"
import { useMutation } from "@tanstack/react-query"
import * as apiClient from '../../api-client'
import { useAppContext } from "../../contexts/AppContext"


type Props = {
 currentUser: UserType
 paymentIntent: PaymentIntentResponse
}

export type BookingFormData = {
 firstName: string
 lastName: string
 email: string
 adultCount: number
 childCount: number
 checkIn: string
 checkOut: string
 hotelId: string
 paymentIntentId: string
 totalCost: number
}


const BookingForm = ({ currentUser, paymentIntent }: Props) => {
 const stripe = useStripe()
 const elements = useElements()
 const search = useSearchContext()
 const { hotelId } = useParams()
 const { showToast } = useAppContext()

 const { mutate: bookRoom, isPending } = useMutation({
  mutationFn: apiClient.createRoomBooking,
  onSuccess: () => {
   showToast({ message: 'Booking Saved!', type: 'SUCCESS' })
  },
  onError: () => {
   showToast({ message: 'Error saving booking', type: 'ERROR' })
  }
 })


 const { handleSubmit, register } = useForm<BookingFormData>({
  defaultValues: {
   firstName: currentUser.firstName,
   lastName: currentUser.lastName,
   email: currentUser.email,
   adultCount: search.adultCount,
   childCount: search.childCount,
   checkIn: search.checkIn.toISOString(),
   checkOut: search.checkOut.toISOString(),
   hotelId: hotelId,
   totalCost: paymentIntent.totalCost,
   paymentIntentId: paymentIntent.paymentIntentId
  }
 })

 const onSubmit = async (formData: BookingFormData) => {
  if (!stripe || !elements) {
   return
  }

  const result = await stripe.confirmCardPayment(paymentIntent.clientSecret, {
   payment_method: {
    card: elements.getElement(CardElement) as StripeCardElement
   }
  })

  if (result.paymentIntent?.status === 'succeeded') {
   // book the room
   bookRoom({ ...formData, paymentIntentId: result.paymentIntent.id })
  }
 }

 return (
  <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-1 gap-3 rounded-lg border border-slate-300 p-5 space-y-2">
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

   <div className="space-y-2">
    <h2 className="text-xl font-semibold">
     Your Price Summary
    </h2>
    <div className="bg-blue-200 p-4 rounded-md">
     <div className="font-semibold text-lg">
      Total Cost: ${paymentIntent.totalCost.toFixed(2)}
     </div>
     <div className="text-xs">Includes taxes and charges</div>
    </div>
   </div>

   <div className="space-y-2">
    <h3 className="text-xl font-semibold">Payment Details</h3>
    <CardElement
     id="payment-intent"
     className="border border-gray-400 p-4 rounded-md text-sm"
    />
   </div>
   <div className="flex justify-end">
    <button
     disabled={isPending}
     className="bg-blue-600 text-white font-bold p-2 hover:bg-blue500 disabled:bg-gray-500 ">
     {isPending ? 'Saving...' : 'Confirm Booking'}
    </button>
   </div>
  </form>
 )
}

export default BookingForm