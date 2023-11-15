"use client"
import React from 'react'
import { store } from '@/store/store'
import { Provider } from 'react-redux'
import { useEffect } from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Wrapper = ({children}) => {
  return (
    <>
      <Provider store={store}>
         {children}
         <ToastContainer />
      </Provider>
    </>
  )
}

export default Wrapper