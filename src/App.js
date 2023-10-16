import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LoginPage from './component/LoginPage'
import OrdersPage from './component/OrdersPage'
import ProductListingPage from './component/ProductListingPage'
import UserListingPage from './component/UserListingPage'

const App = () => {
  return (

<Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path='/products' element={<ProductListingPage/>}/>
        <Route path='/users' element={<UserListingPage/>}/>
      </Routes>
    </Router>

  )
}

export default App