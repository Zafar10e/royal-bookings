import { Link } from "react-router"
import "../index.css";
import { RxCross2 } from 'react-icons/rx'
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import './navbar.css'
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./signout-button";

const Navbar = () => {

  const { isLoggedIn } = useAppContext()
  const [toggleMenu, setToggleMenu] = useState(false)

  return (
    <div className="flex bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 py-4">
      <div className="flex relative container mx-auto items-center justify-between">
        <span className="text-lg md:2xl font-semibold text-white tracking-tighter">
          <Link to='/'>RoyalBookings.com</Link>
        </span>

        {isLoggedIn ? (
          <div className="hidden sm:flex gap-2">
            <Link className="flex text-white text-lg font-semibold hover:bg-blue-600 items-center px-3 py-1 rounded " to='/my-bookings'>My Bookings</Link>
            <Link className="flex items-center text-white text-lg font-semibold hover:bg-blue-600 rounded px-3 py-1" to='/my-hotels'>My Hotels</Link>
            <SignOutButton />
          </div>
        ) : (
          <div className="hidden sm:flex space-x-2">
            <div className="border border-white rounded hover:border-red-200  p-0.5">
              <Link to='/register' className="flex items-center px-3 py-0.5 text-blue-950 rounded bg-gray-50 hover:bg-gray-100 font-semibold text-lg text-nowrap hover:underline">Register</Link>
            </div>
            <div className="border border-white rounded p-0.5 hover:border-red-200">
              <Link to='/sign-in' className="flex items-center font-semibold text-lg text-blue-950 text-nowrap bg-gray-50 px-3 py-0.5 rounded hover:underline hover:bg-gray-100">Sign-in</Link>
            </div>
          </div>
        )}



        {/* small to medium */}
        <div className="flex flex-col sm:hidden">
          {toggleMenu ? (
            <RxCross2 color="#fff" size={24} className="cross cursor-pointer"
              onClick={() => setToggleMenu(false)}
            />
          ) : (
            <GiHamburgerMenu color="#fff" size={24} className="hamburger cursor-pointer"
              onClick={() => setToggleMenu(true)}
            />
          )}

          {toggleMenu && (
            <div className={`absolute  flex flex-col items-center justify-between top-10 right-4 border-2  border-orange-400 rounded px-8 py-5 text-blue-800 bg-white text-xl font-semibold gap-0.5
            ${toggleMenu && 'menu'}`}>
              <Link to='/register' className={`p-1 hover:underline hover:text-blue-600 
              ${toggleMenu && 'register'}`}>
                Register
              </Link>

              <Link to='/about' className={`p-1 hover:text-blue-600 hover:underline 
              ${toggleMenu && 'about'}`}>
                About
              </Link>

              <hr className={`my-2.5 w-full ${toggleMenu && 'line'}`} />

              <Link to='/sign-in'>
                <button className={`bg-blue-700 hover:bg-blue-600 px-4 py-1 my-1.5 rounded text-white hover:underline 
                ${toggleMenu && 'sign-out'}`}>
                  Sign-in
                </button>
              </Link>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

export default Navbar;