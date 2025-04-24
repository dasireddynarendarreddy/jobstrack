import React,{useContext, useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Userkey } from './UI'
function Login() {
    const[logininfo,setLoginInfo]=useState({mail:'',password:''})
    const navigate=useNavigate()
    const[login,setLogin]=useState(false)
    const{setId,application,setApplications}=useContext(Userkey);
    console.log(setId)

    const userLogin=async (e)=>{
      e.preventDefault()
      setLogin(true)
    
      try
      {

        const senddata=await axios.post(import.meta.env.MODE=='development'?`${import.meta.env.VITE_NORM_BACKEND_URL}/login`:`${import.meta.env.VITE_BACKEND_URL}/login`,logininfo)
       
        
        console.log(senddata.data,senddata.data.tokenid,senddata.data.userval)
            if(senddata.status===200)
            {
              setLogin(false)
              setId(senddata.data.userval)
              const id=senddata.data.tokenid
              const uid=senddata.data.userval
              const jobs=senddata.data.jobs
              console.log("the jobs got after login",jobs)
              setApplications(jobs)
              localStorage.setItem("tokeninfo",JSON.stringify([{id:id,uid:uid,jobs:jobs}]))
                navigate("/home")
            }
          }
          catch(error)
          {
             if (error.response && error.response.data && error.response.data.message) {
                     toast.error(error.response.data.message)
                     console.log("Error message:", error.response.data.message);
                   } else {
                    
                     console.log("Unexpected error:", error.message);
                   }
          }
       
    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <ToastContainer/>
      <form 
  onSubmit={userLogin} 
  className="max-w-sm mx-auto mt-10 bg-white p-6 rounded-2xl shadow-lg space-y-5 sm:max-w-md md:max-w-lg"
>
  <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>

  <div>
    <label className="block text-gray-700 mb-1" htmlFor="mail">Email</label>
    <input 
      type="text" 
      name="mail" 
      id="mail"
      value={logininfo.mail} 
      onChange={(e) => setLoginInfo({ ...logininfo, [e.target.name]: e.target.value })}
      className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Enter your email"
      required
    />
  </div>

  <div>
    <label className="block text-gray-700 mb-1" htmlFor="password">Password</label>
    <input 
      type="password" 
      name="password" 
      id="password"
      value={logininfo.password} 
      onChange={(e) => setLoginInfo({ ...logininfo, [e.target.name]: e.target.value })}
      className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Enter your password"
      required
    />
  </div>

  <div>
    <input 
      type="submit" 
      value={login?"verifying...":"Login"}
      disabled={login?true:false}

      className={login?"w-full bg-blue-200 text-white py-2 rounded-xl hover:bg-blue-700 transition-colors duration-300 cursor-pointer":"w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition-colors duration-300 cursor-pointer"}
    />
  </div>
</form>

    </div>
  )
}

export default Login
