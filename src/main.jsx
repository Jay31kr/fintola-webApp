import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'

import { store } from './store/store.js'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import TransactionList from './pages/TransactionList.jsx'
import AdminRequest from './pages/AdminRequest.jsx'
import SignIn from './pages/SignIn.jsx'
import SignUp from './pages/SignUp.jsx'
import Insight from './pages/Insight.jsx'
import Profile from './pages/Profile.jsx'
import Home from './pages/Home.jsx'
import Users from './pages/Users.jsx'
import CreateTransaction from './pages/Createtransaction.jsx'
import PublicRoute from './components/PublicRoute.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path='' element={
        // <PublicRoute>
          <Home/>
        //  </PublicRoute>   
        }/>
      <Route path='signin' element={
        // <PublicRoute>
          <SignIn/>
        //  </PublicRoute> 
        }/>
      <Route path='signup' element={
        // <PublicRoute>
          <SignUp/>
        // </PublicRoute>
        }/>
<Route
  path='create-transaction'
  element={
    // <ProtectedRoute minRole="admin">
      <CreateTransaction/>
    // </ProtectedRoute>
  }
/>      <Route path='transactions'element={
        // <ProtectedRoute minRole='viewer'>
          <TransactionList/>
        // </ProtectedRoute>
        }/>
      <Route path='users' element={
        // <ProtectedRoute minRole='admin'>
          <Users/>
        // </ProtectedRoute>  
        }/>
      <Route path='admin-requests' element={
        // <ProtectedRoute minRole='admin'>
          <AdminRequest/>
        // </ProtectedRoute>  
        }/>
      <Route path='profile' element={
        // <PublicRoute>
           <Profile/>
        // </PublicRoute>
       }/>
      <Route path='insights' element={
      // <ProtectedRoute minRole='analyst'>
          <Insight/>
      //  </ProtectedRoute> 
        }/>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
