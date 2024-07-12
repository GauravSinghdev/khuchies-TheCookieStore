import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Lazy load the components
const Home = lazy(() => import('./pages/Home/Home'));
const Login = lazy(() => import('./pages/Login/Login'));
const Signup = lazy(() => import('./pages/Signup/Signup'));
const AboutUs = lazy(() => import('./pages/AboutUs/AboutUs'));
const Shop = lazy(() => import('./pages/Shop/Shop'));
const User = lazy(() => import('./pages/User/User'));
const Cart = lazy(() => import('./pages/Cart/Cart'));
const WishList = lazy(() => import('./pages/WishList/WishList'));
const ContactUs = lazy(() => import('./pages/ContactUs/ContactUs'));
const JoinUs = lazy(() => import('./pages/JoinUs/JoinUs'));
const Jobs = lazy(() => import('./pages/Jobs/Jobs'));
const Setting = lazy(() => import('./pages/Settings/Settings'));
const Orders = lazy(() => import('./pages/Orders/Orders'));
const AllUsers = lazy(() => import('./pages/Admin/AllUsers'));
const AllProducts = lazy(() => import('./pages/Admin/AllProducts'));
const Admin = lazy(() => import('./pages/Admin/'));
const ThankYou = lazy(() => import('./pages/ThankYou/ThankYou'))

const Loader = () => {
  <div aria-label="Loading..." role="status" className="flex items-center gap-2 justify-center mt-40">

    <svg className="h-20 w-20 animate-spin stroke-gray-500" viewBox="0 0 256 256">
        <line x1="128" y1="32" x2="128" y2="64" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line>
        <line x1="195.9" y1="60.1" x2="173.3" y2="82.7" stroke-linecap="round" stroke-linejoin="round"
            stroke-width="24"></line>
        <line x1="224" y1="128" x2="192" y2="128" stroke-linecap="round" stroke-linejoin="round" stroke-width="24">
        </line>
        <line x1="195.9" y1="195.9" x2="173.3" y2="173.3" stroke-linecap="round" stroke-linejoin="round"
            stroke-width="24"></line>
        <line x1="128" y1="224" x2="128" y2="192" stroke-linecap="round" stroke-linejoin="round" stroke-width="24">
        </line>
        <line x1="60.1" y1="195.9" x2="82.7" y2="173.3" stroke-linecap="round" stroke-linejoin="round"
            stroke-width="24"></line>
        <line x1="32" y1="128" x2="64" y2="128" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line>
        <line x1="60.1" y1="60.1" x2="82.7" y2="82.7" stroke-linecap="round" stroke-linejoin="round" stroke-width="24">
        </line>
    </svg>
    <span className="text-4xl font-medium text-gray-500">Loading123...</span>
   </div>
};

const routes = (
  <Router>
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path='*' exact element={<Navigate to="/" />} />
        <Route path='/login' exact element={<Login />} />
        <Route path='/signup' exact element={<Signup />} />
        <Route path='/about-us' exact element={<AboutUs />} />
        <Route path='/all-collections' exact element={<Shop />} />
        <Route path='/user-details' exact element={<User />} />
        <Route path='/cart' exact element={<Cart />} />
        <Route path='/wish-list' exact element={<WishList />} />
        <Route path='/contact-us' exact element={<ContactUs />} />
        <Route path='/join-us' exact element={<JoinUs />} />
        <Route path='/job-openings' exact element={<Jobs />} />
        <Route path='/settings' exact element={<Setting />} />
        <Route path='/my-orders' exact element={<Orders />} />
        <Route path='/admin/' exact element={<Admin />} />
        <Route path='/admin/all-users' exact element={<AllUsers />} />
        <Route path='/admin/all-products' exact element={<AllProducts />} />
        <Route path='/thankyou-page' exact element={<ThankYou />} />
      </Routes>
    </Suspense>
  </Router>
);

function App() {
  return (
    <div>
      {routes}
    </div>
  );
}

export default App;
