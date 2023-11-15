"use client"
import style from './style.module.css'
import React, { useState } from "react";
import { useEffect } from "react";
// import { useRef } from "react";
import axios from '@/utils/axios';
import { useRef } from 'react';
import { useRouter } from "next/navigation";
import {AiFillGoogleCircle} from "react-icons/ai"
import {RxCross2} from "react-icons/rx"
import { asyncaddstudent } from "@/store/Actions/studentActions"
import Link from 'next/link';
import { useSelector, useDispatch } from "react-redux";

const index = () => {

  const dispatch = useDispatch();
  const pt = useRef(null)
  const router = useRouter();

  const input = {
    // height: '60vh',.
    width:'25vw',
    padding:'.6vmax 0vmax',
    paddingLeft:'1.4vmax',
    borderRadius:'3vmax',
    outline:'none',
    focus:'none',
    boxShadow: ' 0 1px 1px rgba(0,0,0,0.12), 0 2px 2px rgba(0,0,0,0.12)'

  };

  const button = {
    // height: '60vh',.
    padding:'.6vmax 0vmax',
    borderRadius:'3vmax',
    outline:'none',
    focus:'none',
    // backgroundColor:'#f2d069',
    backgroundColor:'#1e779d',
    border:'none',
    color:'#fff',
    fontFamily:'roobert',
    letterSpacing:'1px',
    fontWeight:'500',
    boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)'
  };

    const initialFormData = {
      name:'',
      email: '',
      password: '',
      // Add more fields as needed
    };
    const [formData, setformData] =  useState(initialFormData)

    const inputEvent=(event)=>{
      const {name, value} = event.target;

      setformData((preData)=>{
          return {
              ...preData,
              [name]:value,
          }
      })
    }
   
    const formHandler = async (e)=>{
        e.preventDefault();
        dispatch(asyncaddstudent(formData))
        setformData(initialFormData); // Reset form fields
        router.push('/student/home');     
    }

    const rempl = ()=>{
       router.push("/Registere");
    }
  return (
    
    <>
       <div className={style.register_page}>
            <Link style={{color:"#111"}} href="/"><RxCross2 className={style.crosss} /></Link>
           <div className={style.register}>
            
               <div className={style.left_l}>
                    <h3>INFORMATION</h3>
                    <p> Your journey to knowledge begins here. Sign up to access a wide range of courses and resources.</p>
                    <div className={style.lbtm}>
                         <img src="data:image/jpeg;base64,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" alt="" />
                    </div>
               </div>
               <div className={style.right_r}>
                   <h3>REGISTER FORM</h3>
                   <div className={style.options}>
                          <small>As a</small>
                          <div className={style.se}>
                              <h6 ref={pt} className={style.h6}>Student</h6>
                              <h6 onClick={rempl}>Employee</h6>
                          </div>
                     </div>
                     <form className="flex flex-col items-center mt-1" onSubmit={formHandler}>
                        <div className="mb-3">
                          <input style={input}  placeholder='Enter Your Name' required name='name' value={formData.name} onChange={inputEvent} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" autoComplete="username" />
                        </div>
                        <div className="mb-3">
                          <input style={input}  placeholder='Enter Your Email' required name='email' value={formData.email} onChange={inputEvent} type="email" className="form-control" id="text" aria-describedby="emailHelp" autoComplete="username" />
                        </div>
                        <div className="mb-3">
                          <input style={input}  required name='password' value={formData.password} onChange={inputEvent} placeholder='password' type="password" className="form-control" id="exampleInputPassword1" autoComplete="current-password" />
                        </div>
                        
                        <button style={button} onClick={formHandler} type="submit" className="btn btn-primary text-center flex items-center justify-center w-48 mt-3 bg-yellow-500 ">Sign Up</button>
                     </form>
                     <div className={style.or}>
                         <div className={style.line}></div>
                         <p>Or</p>
                         <div className={style.line}></div>
                     </div>
                     <div className={style.dvg}>
                        <Link href="/student/login" style={{textDecoration:"none"}}>
                            <div className={style.ggl}>
                            <h6>Already Have An Account</h6>
                            </div>
                        </Link>
                        <div className={style.ggl}>
                          <h6>Login with Google</h6>
                          <AiFillGoogleCircle className=' text-2xl' />
                        </div>
                     </div>
                     
                    
                    
               </div>
           </div>
       </div>
    </>
    
  )
}

export default index