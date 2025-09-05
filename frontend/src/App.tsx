import { BrowserRouter, Routes, Route, Navigate } from 'react-router'
import Register from './pages/register'
import SignIn from './pages/sign-in'
import AddHotel from './pages/addHotel'
import { useAppContext } from './contexts/AppContext'
import MyHotels from './pages/my-hotels'
import Layout, { MiniLayout } from './layouts/layout'
import EditHotel from './pages/editHotel'
import Search from './pages/search'
import Details from './pages/Details'
import Booking from './pages/booking'
import MyBookings from './pages/myBookings'


function App() {
  const { isLoggedIn } = useAppContext()
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={
          <Layout>
            <p>Home Page</p>
          </Layout>
        }
        />
        <Route path='/search' element={
          <Layout>
            <Search />
          </Layout>
        }
        />
        <Route
          path='/details/:hotelId'
          element={
            <MiniLayout>
              <Details />
            </MiniLayout>
          }
        />
        <Route path='/register' element={
          <MiniLayout>
            <Register />
          </MiniLayout>

        } />
        <Route path='/sign-in' element={
          <MiniLayout>
            <SignIn />
          </MiniLayout>} />

        {isLoggedIn && (
          <>
            <Route
              path='/hotel/:hotelId/booking'
              element={
                <MiniLayout>
                  <Booking />
                </MiniLayout>
              }
            />

            <Route path='/add-hotel' element={
              <MiniLayout>
                <AddHotel />
              </MiniLayout>
            } />

            <Route
              path='/edit-hotel/:hotelId'
              element={
                <MiniLayout>
                  <EditHotel />
                </MiniLayout>
              }
            />

            <Route path='/my-hotels' element={
              <MiniLayout>
                <MyHotels />
              </MiniLayout>
            } />

            <Route
              path='/my-bookings'
              element={
                <MiniLayout>
                  <MyBookings />
                </MiniLayout>
              }
            />

          </>
        )}
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </BrowserRouter >

  )
}

export default App
