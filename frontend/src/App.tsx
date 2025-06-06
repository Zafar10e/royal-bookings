import { BrowserRouter, Routes, Route, Navigate } from 'react-router'
import Layout from './layouts/Layout'
import Register from './pages/register'
import SignIn from './pages/sign-in'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={
          <Layout>
            <p>Home Page</p>
          </Layout>} />
        <Route path='/search' element={
          <Layout>
            <p>Search Page</p>
          </Layout>
        } />
        <Route path='/register' element={<Register />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </BrowserRouter>

  )
}

export default App
