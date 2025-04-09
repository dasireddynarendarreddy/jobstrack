import axios from "axios";
import React from "react";

const API = import.meta.env.BACKEND_URL;

const JobCard = ({ app, fetchApplications }) => {
  const handleDelete = async () => {
    console.log(app._id)
    await axios.delete(`${API}/${app._id}`);
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
    await axios.put(`${API}/${app._id}`, { ...app, status: updatedStatus });
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
          <button onClick={handleStatusUpdate}  className="bg-green-500 p-2 rounded-sm cursor-pointer w-fit" variant="secondary">Next Status</button>
          <button onClick={handleDelete}  className="bg-red-500 p-2 rounded-sm cursor-pointer w-fit" variant="destructive">Delete</button>
        </div>
     
    </>
  );
};

export default JobCard;
