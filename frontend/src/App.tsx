import { BrowserRouter, Routes, Route, Navigate } from 'react-router'
import Register from './pages/register'
import SignIn from './pages/sign-in'
import AddHotel from './pages/addHotel'
import { useAppContext } from './contexts/AppContext'
import MyHotels from './pages/my-hotels'
import Layout, { MiniLayout } from './layouts/layout'




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
            <p>Search Page</p>
          </Layout>
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
            <Route path='/add-hotel' element={
              <MiniLayout>
                <AddHotel />
              </MiniLayout>

            } />
            <Route path='/my-hotels' element={
              <MiniLayout>
                <MyHotels />
              </MiniLayout>

            } />
          </>
        )}
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </BrowserRouter >

  )
}

export default App
