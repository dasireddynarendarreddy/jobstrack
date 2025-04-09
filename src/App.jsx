import { useEffect, useState } from "react";
import axios from "axios";
import Home from "./Pages/Home"
import React from "react";

const API = import.meta.env.VITE_API_URL;

function App() {
  const [applications, setApplications] = useState([]);
  const [filter, setFilter] = useState("All");

  const fetchApplications = async () => {
    const res = await axios.get(`http://localhost:5000/api/application`);
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
