import { HotelType } from "../../../backend/src/shared/types"

type Props = {
 checkIn: Date
 checkOut: Date
 adultCount: number
 childCount: number
 numberOfNights: number
 hotel?: HotelType
}

const BookingDetailsSummary = ({ checkIn, checkOut, adultCount, childCount, numberOfNights, hotel }: Props) => {

 return (
  <div className="flex flex-1 flex-col rounded-lg border border-slate-300 gap-5 py-5 px-4 lg:px-8 h-fit">
   <h2 className="text-xl text-gray-800 font-bold">Your Booking Details</h2>
   <div className="flex flex-col gap-5 pb-2">
    <div>
     Location:
     <div className="font-semibold">
      {`${hotel?.name}, ${hotel?.city}, ${hotel?.country}`}
     </div>
    </div>
    <div className="flex justify-between">
     <div>
      Check-in
      <div className="font-semibold">
       {checkIn.toDateString()}
      </div>
     </div>
     <div>
      Check-out
      <div className="font-semibold">
       {checkOut.toDateString()}
      </div>
     </div>
    </div>
    <div className="border-t border-gray-400 mt-5 pt-5">
     Total length of stay:
     <div className="font-semibold">
      "{numberOfNights}" nights
     </div>
    </div>
    <div className="border-t border-gray-400 mt-5 pt-5">
     Guests:
     <div className="font-semibold">
      "{adultCount}" adults & "{childCount}" childs
     </div>
    </div>
   </div>
  </div>
 )

}

export default BookingDetailsSummary