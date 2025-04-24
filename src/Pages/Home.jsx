
import React, { useContext, useEffect } from "react";
const JobForm=React.lazy(()=>import('../JobComp/JobForm'))
const JobCard=React.lazy(()=>import('../JobComp/JobCard'))
const FilterBar=React.lazy(()=>import('../JobComp/FilterBar'))
import { Userkey } from "../AllRoutes/UI";
import axios from "axios";
const Home = ({ applications, setApplications, fetchApplications, filter, setFilter}) => {
   const{userid}=useContext(Userkey)
    const filteredApps = Array.isArray(applications)
      ? applications.filter(app => filter === "All" || app.status === filter)
      : [];
      console.log("the id is",userid)
      useEffect(()=>{
     fetchApplications(JSON.parse(localStorage.getItem("tokeninfo"))[0].uid)


      },[])
  
    return (
      <>
        <h1 className="text-3xl font-bold mb-6 text-center">🎯 Student Job Tracker</h1>
        <input/>
        <JobForm fetchApplications={fetchApplications} userid={userid} />
        <FilterBar filter={filter} setFilter={setFilter} />
        <span>The No of Jobs That You Have Applied For:{filteredApps.length}</span>
        <div className="grid gap-4 mt-6">
          {filteredApps.length>0?filteredApps.map((app,index) => (
          <JobCard
              key={app._id}
              app={app}
              fetchApplications={fetchApplications}
              index={index}
            />
          )):"NO JOBS HERE"}
        </div>
      </>
    );
  };
  
  export default Home;