import React from 'react'

import { BrowserRouter as 
  Router, 
  Routes, 
  Route,
} from 'react-router-dom'

import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'
import AboutUs from './pages/AboutUs/AboutUs'
import Shop from './pages/Shop/Shop'
import User from './pages/User/User'
import Cart from './pages/Cart/Cart'
import WishList from './pages/WishList/WishList'
import ContactUs from './pages/ContactUs/ContactUs' 
import JoinUs from './pages/JoinUs/JoinUs'
import Jobs from './pages/Jobs/Jobs'
import Setting from './pages/Settings/Settings'
import Orders from './pages/Orders/Orders'
import AllUsers from './pages/Admin/AllUsers'

const routes = (
  <Router>
    <Routes>
      <Route path='/' exact element={<Home/>}></Route>
      <Route path='/login' exact element={<Login/>}></Route>
      <Route path='/signup' exact element={<Signup/>}></Route>
      <Route path='/about-us' exact element={<AboutUs/>}></Route>
      <Route path='/all-collections' exact element={<Shop/>}></Route>
      <Route path='/user-details' exact element={<User/>}></Route>
      <Route path='/cart' exact element={<Cart/>}></Route>
      <Route path='/wish-list' exact element={<WishList/>}></Route>
      <Route path='/contact-us' exact element={<ContactUs/>}></Route>
      <Route path='/join-us' exact element={<JoinUs/>}></Route>
      <Route path='/job-openings' exact element={<Jobs/>}></Route>
      <Route path='/settings' exact element={<Setting/>}></Route>
      <Route path='/my-orders' exact element={<Orders/>}></Route>
      <Route path='/all-users' exact element={<AllUsers/>}></Route>

    </Routes>
  </Router>
)

function App() {
  return (
    <div>
      {routes}
    </div>
  )
}

export default App