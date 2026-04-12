import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import './index.css'
import App from './App.jsx'

import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import TransactionList from './pages/TransactionList.jsx'
import AdminRequest from './pages/AdminRequest.jsx'
import SignIn from './pages/SignIn.jsx'
import SignUp from './pages/SignUp.jsx'
import Insight from './pages/Insight.jsx'
import Profile from './pages/Profile.jsx'
import Home from './pages/Home.jsx'
import Users from './pages/Users.jsx'



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path='' element={<Home/>}/>
      <Route path='signin' element={<SignIn/>}/>
      <Route path='signup' element={<SignUp/>}/>
      <Route path='transactions'element={<TransactionList/>}/>
      <Route path='users' element={<Users/>}/>
      <Route path='admin-request' element={<AdminRequest/>}/>
      <Route path='profile' element={<Profile/>}/>
      <Route path='insights' element={<Insight/>}/>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
