import { useState } from "react"
import DatePicker from "react-datepicker"
import { MdTravelExplore } from "react-icons/md"
import 'react-datepicker/dist/react-datepicker.css'

const SearchBar = () => {
  const [checkIn, setCheckIn] = useState(new Date())
  const [checkOut, setCheckOut] = useState(new Date())

  const minDate = new Date()
  const maxDate = new Date()

  maxDate.setFullYear(maxDate.getFullYear() + 1)

  return (
    <form className="-mt-10 xl:-mt-8 bg-white border-5 border-orange-400 rounded-lg shadow-md grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-1 p-1.5 text-md font-semibold">
      <div className="flex flex-1 flex-col">
        Where are you going?
        <div className="flex items-center border-2 border-orange-400 rounded gap-2 p-1.5 ">
          <MdTravelExplore size={25} />
          <input className="flex-1 focus:outline-none" />
        </div>
      </div>

      <div className="flex gap-1">
        <div className="flex flex-1 flex-col">
          Start_date:
          <DatePicker selected={checkIn} onChange={(date) => setCheckIn(date!)} startDate={checkIn} endDate={checkOut} minDate={minDate} maxDate={maxDate} placeholderText="Check-in Date"
            className="flex w-full border-2 border-orange-400 rounded p-1.5 focus:outline-none" />
        </div>
        <div className="flex flex-1 flex-col">
          End_date:
          <DatePicker selected={checkOut} onChange={(date) => setCheckOut(date!)}
            startDate={checkIn} endDate={checkOut} minDate={minDate} maxDate={maxDate} placeholderText="Check-out Date"
            className="flex w-full border-2 border-orange-400 p-1.5 rounded focus:outline-none"
          />
        </div>
      </div>

      <div className="flex gap-1">
        <div className="flex flex-1 flex-col">
          Adults:
          <input type="number" min={1} max={10} defaultValue={1} className="border-2 border-orange-400 rounded p-1.5 focus:outline-none" />
        </div>
        <div className="flex flex-1 flex-col">
          Children:
          <input type="number" min={0} max={10} defaultValue={0} className="border-2 border-orange-400 rounded focus:outline-none p-1.5" />
        </div>
      </div>

      <div className="flex gap-1 mt-1 lg:mt-4">
        <div className="flex flex-2/3 border rounded  border-blue-950 p-0.5">
          <button className="flex-2/3 bg-blue-900 text-white text-lg rounded p-1.5">Search</button>
        </div>
        <div className="flex flex-1/3 border border-red-700 rounded p-0.5">
          <button className="flex-1/3 bg-red-600 text-white text-lg rounded p-1.5">Clear</button>
        </div>
      </div>




    </form>
  )
}

export default SearchBar;