import JobCard from '../JobComp/JobCard'
import JobForm from "../JobComp/JobForm"
import FilterBar from "../JobComp/FilterBar"
import React from "react";


const Home = ({ applications, setApplications, fetchApplications, filter, setFilter }) => {
    const filteredApps = Array.isArray(applications)
      ? applications.filter(app => filter === "All" || app.status === filter)
      : [];
  
    return (
      <>
        <h1 className="text-3xl font-bold mb-6 text-center">🎯 Student Job Tracker</h1>
        <input/>
        <JobForm fetchApplications={fetchApplications} />
        <FilterBar filter={filter} setFilter={setFilter} />
        <div className="grid gap-4 mt-6">
          {filteredApps.map((app) => (
            <JobCard
              key={app._id}
              app={app}
              fetchApplications={fetchApplications}
            />
          ))}
        </div>
      </>
    );
  };
  
  export default Home;