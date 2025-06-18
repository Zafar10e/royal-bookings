const Footer = () => {
 return (
  <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 py-6 sm:py-8">
   <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
    <span className="text-xl text-white font-semibold tracking-tight">
     RoyalBookings.com
    </span>
    <span className="text-white font-semibold tracking-tight flex gap-4">
     <p className="cursor-pointer">Privacy Policy</p>
     <p className="cursor-pointer">Terms of Service</p>
    </span>
   </div>
  </div>
 )
}

export default Footer;