import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Register() {
    const[data,setData]=useState({name:'',mail:'',password:''})
    const navigate=useNavigate();
    const[register,setRegister]=useState(false)
    const registerUser = async (e) => {
      e.preventDefault();
      try {
        console.log("Sending data:", data);
         
          setRegister(true)
        const res = await axios.post(import.meta.env.MODE=='development'?`${import.meta.env.VITE_NORM_BACKEND_URL}/register`:`${import.meta.env.VITE_BACKEND_URL}/register`, data);
        
        console.log("Success response:", res.data);
    
        // Redirect if successful
        if (res.status === 201) {
          setRegister(false)
          toast.success("user registerd sucessfully!")
          navigate("/login");
        }
      } catch (error) {
        // 👇 This catches and shows just the error message from the backend
        if (error.response && error.response.data && error.response.data.message) {
          toast.error(error.response.data.message)
          console.log("Error message:", error.response.data.message);
        } else {
         
          console.log("Unexpected error:", error.message);
        }
      }
    };
    const redirectToLogin=()=>{
      navigate('/login')
    }
    useEffect(()=>{

      if(localStorage.getItem("tokeninfo"))
      {
        const tokenInfo = JSON.parse(localStorage.getItem("tokeninfo"));
             
        if (tokenInfo && tokenInfo[0]?.id) {
          fetch( import.meta.env.MODE=='development'?`${import.meta.env.VITE_NORM_BACKEND_URL}/verify`:`${import.meta.env.VITE_BACKEND_URL}/verify`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${tokenInfo[0].id}`,
            },
          })
            .then(async res => {
              const statusCode = res.status; // Get HTTP status code
              const data = await res.json(); // Parse JSON body
              console.log('Status Code:', statusCode);
              console.log('Response Data:', data);
        
              if(statusCode==200)
              {
                navigate("/home")
              }
              else{
                toast.error(data.message)
              }
            })
            .catch(err => console.error('Fetch error:', err));
        }
      }
        

    },[])
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
  <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg space-y-6">
    
    <h2 className="text-3xl font-bold text-center text-gray-800">Register</h2>

    <form onSubmit={registerUser} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-gray-700 mb-1">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={data.name}
          onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your name"
          required
        />
      </div>

      <div>
        <label htmlFor="mail" className="block text-gray-700 mb-1">Email</label>
        <input
          type="email"
          name="mail"
          id="mail"
          value={data.mail}
          onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your email"
          required
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-gray-700 mb-1">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={data.password}
          onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your password"
          required
        />
      </div>

      <div>
        <input
          type="submit"
          disabled={register}
          value={register ? "Registering..." : "Register"}
          className="w-full bg-green-600 text-white py-2 rounded-xl hover:bg-green-700 transition-colors duration-300 cursor-pointer"
        />
      </div>
    </form>

    <div className="flex items-center justify-center gap-2 text-gray-600 mt-4">
      <div className="w-full h-px bg-gray-300" />
      <span className="text-sm font-semibold">OR</span>
      <div className="w-full h-px bg-gray-300" />
    </div>

    <div className="flex justify-center">
      <button
        type="button"
        onClick={redirectToLogin}
        className="w-40 bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition-colors duration-300 cursor-pointer"
      >
        Login
      </button>
    </div>

    <ToastContainer />
  </div>
</div>

         
    
  )
}

export default Register
