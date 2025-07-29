import { FormEvent, useState } from "react"
import DatePicker from "react-datepicker"
import { MdTravelExplore } from "react-icons/md"
import 'react-datepicker/dist/react-datepicker.css'
import { useSearchContext } from "../contexts/searchContext"
import { useNavigate } from "react-router"

const SearchBar = () => {
  const search = useSearchContext()
  const navigate = useNavigate()

  const [destination, setDestination] = useState<string>(search.destination)
  const [checkIn, setCheckIn] = useState<Date>(search.checkIn)
  const [checkOut, setCheckOut] = useState<Date>(search.checkOut)
  const [adultCount, setAdultCount] = useState<number>(search.adultCount)
  const [childCount, setChildCount] = useState<number>(search.childCount)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    search.saveSearchValues(destination, checkIn, checkOut, adultCount, childCount)
    navigate('/search')
  }

  const minDate = new Date()
  const maxDate = new Date()

  maxDate.setFullYear(maxDate.getFullYear() + 1)

  return (
    <form onSubmit={handleSubmit} className="-mt-12 xl:-mt-10 bg-white border-4 border-orange-400 rounded-lg shadow-md grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-1 p-2 text-md">
      <div className="flex flex-1 flex-col">
        Where are you going?
        <div className="flex items-center border-2 border-orange-400 rounded gap-2 p-1.5 ">
          <MdTravelExplore size={25} />
          <input className="flex-1 focus:outline-none"
            value={destination}
            onChange={e => setDestination(e.target.value)}
          />
        </div>
      </div>

      <div className="flex gap-2">
        <div className="flex flex-1 flex-col">
          Start_date:
          <DatePicker selected={checkIn} onChange={(date) => setCheckIn(date as Date)} selectsStart startDate={checkIn} endDate={checkOut} minDate={minDate} maxDate={maxDate} placeholderText="Check-in Date"
            className="flex w-full border-2 border-orange-400 rounded p-1.5 focus:outline-none" />
        </div>
        <div className="flex flex-1 flex-col">
          End_date:
          <DatePicker selected={checkOut} onChange={(date) => setCheckOut(date as Date)}
            startDate={checkIn} endDate={checkOut} minDate={minDate} maxDate={maxDate} placeholderText="Check-out Date"
            className="flex w-full border-2 border-orange-400 p-1.5 rounded focus:outline-none"
          />
        </div>
      </div>

      <div className="flex gap-2">
        <div className="flex flex-1 flex-col">
          Adults:
          <input type="number" min={1} max={10} value={adultCount} onChange={e => setAdultCount(parseInt(e.target.value))}
            className="border-2 border-orange-400 rounded p-1.5 focus:outline-none" />
        </div>
        <div className="flex flex-1 flex-col">
          Children:
          <input type="number" min={0} max={10} value={childCount} onChange={e => setChildCount(parseInt(e.target.value))}
            className="border-2 border-orange-400 rounded focus:outline-none p-1.5" />
        </div>
      </div>

      <div className="flex gap-2 mt-1 lg:mt-4">
        <span className="flex flex-2/3 border border-blue-950  rounded p-0.5">
          <button className="flex-2/3 bg-blue-900 text-white text-lg hover:text-xl hover:bg-blue-800 rounded p-1.5">Search</button>
        </span>
        <span className="flex flex-1/3 border border-red-700 rounded p-0.5">
          <button className="flex-1/3 bg-red-600 hover:bg-red-500 text-white text-lg hover:text-xl
           rounded p-1.5">Clear</button>
        </span>
      </div>




    </form>
  )
}

export default SearchBar;