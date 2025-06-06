import Navbar from "../components/navbar";
import Hero from "../components/hero";
import SearchBar from "../components/searchBar";
import Footer from "../components/footer";

interface Props {
 children: React.ReactNode
}

const Layout = ({ children }: Props) => {
 return (
  <div className="flex flex-col min-h-screen">
   <Navbar />
   <Hero />
   <div className="container mx-auto flex-1">
    <SearchBar />
    {children}
   </div>
   <Footer />
  </div>
 )
}

export default Layout;