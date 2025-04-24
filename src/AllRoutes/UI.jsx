import React, { createContext, useEffect,useState} from 'react';
import {Route,Routes} from "react-router-dom"
import Register from '../JobComp/Register';
import Home from '../Pages/Home';
import NavBar from '../JobComp/NavBar'
import axios from 'axios';
import Login from './Login';
export const Userkey=createContext()
function UI() {
    const [applications, setApplications] = useState([]);
  const [filter, setFilter] = useState("All");
  const[userid,setId]=useState('')
  const [uinfo,setUInfo]=useState(null)
  console.log("from ui comp the data is",uinfo)
  /*useEffect(() => {
    const tokenData = localStorage.getItem("tokeninfo");
    if (tokenData) {
      setUInfo(JSON.parse(tokenData));
    }
    console.log("useeffect from ui")
  }, []);*/
  useEffect(() => {
    const tokenData = localStorage.getItem("tokeninfo");
    if (tokenData) {
      setUInfo(JSON.parse(tokenData));
    }
    const handleBeforeUnload = (e) => {
      e.preventDefault(); // Some browsers still require this
      e.returnValue = ""; // This triggers the warning dialog
    };
  
    window.addEventListener("beforeunload", handleBeforeUnload);
  
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
  
 
     

  const fetchApplications = async () => {
    const res = await axios.get( import.meta.env.MODE=='development'?`${import.meta.env.VITE_NORM_BACKEND_URL}?id=${uinfo[0].uid}`:`${import.meta.env.VITE_BACKEND_URL}?id=${uinfo[0].uid}`);
  console.log("from the ui",uinfo)
    console.log(res.data)
    setApplications(res.data);
  };
  
 
  return (
    <div>
       
        <Userkey.Provider value={{userid,setId,applications,setApplications,uinfo,setUInfo}}>
        <Routes>
            

            <Route path="/"  element={<Register/>}/>
            <Route path="/home" element={<Home  applications={applications}
        setApplications={setApplications}
        fetchApplications={fetchApplications}
        filter={filter}
        
        setFilter={setFilter}/>
       
        }/>
        <Route path="/login" element={<Login/>}/>
            

        </Routes>
        </Userkey.Provider>
    </div>
  )
}

export default UI
