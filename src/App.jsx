import { useEffect, useState } from "react";
import axios from "axios";
import Home from "./Pages/Home"
import React from "react";

const API = import.meta.env.VITE_API_URL;

function App() {
  const [applications, setApplications] = useState([]);
  const [filter, setFilter] = useState("All");

  const fetchApplications = async () => {
    const res = await axios.get( import.meta.env.MODE=='development'?`${import.meta.env.VITE_NORM_BACKEND_URL}`:`${import.meta.env.VITE_BACKEND_URL}`);
    setApplications(res.data);
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  return (
    <main className="container mx-auto px-4 py-8">
      <Home
        applications={applications}
        setApplications={setApplications}
        fetchApplications={fetchApplications}
        filter={filter}
        setFilter={setFilter}
      />
    </main>
  );
}

export default App;
