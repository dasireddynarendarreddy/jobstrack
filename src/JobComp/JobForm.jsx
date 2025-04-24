import { useState } from "react";
import axios from "axios";
import React from "react";
import { Userkey } from "../AllRoutes/UI";
import './JobForm.css'
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
const JobForm = ({ fetchApplications}) => {
  const[submitting,setSubmit]=useState(false)
  const{userid,setid,uinfo}=useContext(Userkey)
  console.log(userid)
  console.log("the user info is",uinfo)
  const navigate =useNavigate()
  const [form, setForm] = useState({
    company: "",
    role: "",
    appliedDate: "",
    status: "Applied",
    link: "",
    userkey:uinfo[0].uid

  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    setSubmit(true)
    console.log(form)
    e.preventDefault();
    let data=JSON.parse(localStorage.getItem("tokeninfo"))[0].jobs
    let jobinfo=[...data,form]
    let id=uinfo[0].id
    let uid=uinfo[0].uid
    
   
    try {
      
    let res=await axios.post( import.meta.env.MODE=='development'?`${import.meta.env.VITE_NORM_BACKEND_URL}`:`${import.meta.env.VITE_BACKEND_URL}`, form);
    localStorage.setItem("tokeninfo",JSON.stringify([{id:id,uid:uid,jobs:jobinfo}]))
    console.log(res)
    if(res.status===201)
    {
          setSubmit(false)
    }
      
    } catch (error) {
      console.error("Error submitting job:", error);
    }

    setForm({ company: "", role: "", appliedDate: "", status: "Applied", link: "",userkey:uinfo[0].uid});
    fetchApplications();
  };
  const LogOutUser=()=>{
    localStorage.removeItem("tokeninfo")
    navigate("/")
  
  }


  return (
    <div>
      <button className="float-left bg-red-500 text-white px-4 py-2 rounded-lg cursor-pointer" onClick={()=>LogOutUser()}>
  Logout
</button>
    <form
      className="w-full max-w-3xl mx-auto bg-white shadow-md p-6 rounded-md space-y-4"
      onSubmit={handleSubmit}
    >
      <h2 className="text-xl font-semibold text-center">Add a New Job Application</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          name="company"
          placeholder="Company"
          value={form.company}
          onChange={handleChange}
          required
          className="w-full max-w-md border border-black p-2 rounded"
        />
        <input
          name="role"
          placeholder="Role"
          value={form.role}
          onChange={handleChange}
          required
          className="w-full max-w-md border border-black p-2 rounded"
        />
        <input
          type="date"
          name="appliedDate"
          value={form.appliedDate}
          onChange={handleChange}
          placeholder="date"
          required
          className="w-full max-w-md border border-black p-2 rounded"
        />
        <input
          name="link"
          placeholder="Job Link"
          value={form.link}
          onChange={handleChange}
          className="w-full max-w-md border border-black p-2 rounded"
        />
      </div>
      <div className="text-center">
      {submitting?<div className="loader"></div>:<button type="submit" className="cursor-pointer p-2 rounded-sm sm:w-auto bg-gray-500 w-fit text-white">
         ➕ Add Application
        </button>}
      </div>
    </form>
    </div>
  );
};

export default JobForm;
