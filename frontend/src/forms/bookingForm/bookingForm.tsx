import { useForm } from "react-hook-form"
import { PaymentIntentResponse, UserType } from "../../../../backend/src/shared/types"
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { StripeCardElement } from "@stripe/stripe-js"

type Props = {
 currentUser: UserType
 paymentIntent: PaymentIntentResponse
}

type BookingFormData = {
 firstName: string
 lastName: string
 email: string
}


const BookingForm = ({ currentUser, paymentIntent }: Props) => {
 const stripe = useStripe()
 const elements = useElements()

 const { handleSubmit, register } = useForm<BookingFormData>({
  defaultValues: {
   firstName: currentUser.firstName,
   lastName: currentUser.lastName,
   email: currentUser.email
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
  }

 }

 return (
  <form className="flex flex-col flex-1 gap-3 rounded-lg border border-slate-300 p-5 space-y-2">
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

  </form>
 )
}

export default BookingForm