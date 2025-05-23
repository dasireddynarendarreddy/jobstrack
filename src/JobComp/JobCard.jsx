import axios from "axios";
import React, { useContext, useState } from "react";

import './JobCard.css'
import { Userkey } from "../AllRoutes/UI";
const API = import.meta.env.VITE_NORM_BACKEND_URL;

const JobCard = ({ app, fetchApplications,index}) => {
  const[updating,setUpdate]=useState(false)
  const[del,setDelete]=useState(false)
  const{uinfo}=useContext(Userkey)
  const handleDelete = async (val) => {
    console.log(app._id)
    let data=JSON.parse(localStorage.getItem("tokeninfo"))[0].jobs
    data.splice(val,1)
    let id=uinfo[0].id
    let uid=uinfo[0].uid
    localStorage.setItem("tokeninfo",JSON.stringify([{id:id,uid:uid,jobs:data}]))
  
    console.log("the index is",val)

    setDelete(true)
   let del= await axios.delete(import.meta.env.MODE=='development'?`${import.meta.env.VITE_NORM_BACKEND_URL}/${app._id}`:`${import.meta.env.VITE_BACKEND_URL}/${app._id}`);
   console.log("delete",del)
   if(del.status===200)
   {
    setDelete(false)
    
   }
    fetchApplications();
  };

  const cycleStatus = {
    "Applied": "Interview",
    "Interview": "Offer",
    "Offer": "Rejected",
    "Rejected": "Applied"
  };

  const handleStatusUpdate = async () => {
    
    const updatedStatus = cycleStatus[app.status];
    setUpdate(true)
   let res= await axios.put(import.meta.env.MODE=='development'?`${import.meta.env.VITE_NORM_BACKEND_URL}/${app._id}`:`${import.meta.env.VITE_BACKEND_URL}/${app._id}`, { ...app, status: updatedStatus });
   console.log("updated",res)
   if(res.status===200)
   {
    setUpdate(false)
   }
    fetchApplications();
  };
  

  return (
    <>
     
        <div>
          <h3 className="text-xl font-semibold">{app.company} – {app.role}</h3>
          <p>Status: {app.status} | Date: {new Date(app.appliedDate).toLocaleDateString()}</p>
          <a href={app.link} className="text-blue-600" target="_blank" rel="noreferrer">Job Link</a>
        </div>
        <div className="flex gap-2">
          {updating?<div className="loader"></div>:<button onClick={handleStatusUpdate}  className="bg-green-500 p-2 rounded-sm cursor-pointer w-fit" variant="secondary">Next Status</button>}
          {del?<div className="loader"></div>:<button onClick={()=>handleDelete(index)}  className="bg-red-500 p-2 rounded-sm cursor-pointer w-fit" variant="destructive">Delete</button>}
        </div>
     
    </>
  );
};

export default JobCard;
