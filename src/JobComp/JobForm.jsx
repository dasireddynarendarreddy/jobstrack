import { useState } from "react";
import axios from "axios";
import React from "react";

const API = import.meta.env.VITE_BACKEND_URL;

const JobForm = ({ fetchApplications }) => {
  const [form, setForm] = useState({
    company: "",
    role: "",
    appliedDate: "",
    status: "Applied",
    link: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(typeof API)
      console.log(`${import.meta.env.VITE_NROM_BACKEND_URL}/${3}`)
      console.log(API)
      console.log(import.meta.env.MODE)
      const res = await axios.post( import.meta.env.MODE=='development'?`${import.meta.env.VITE_NORM_BACKEND_URL}`:`${import.meta.env.VITE_BACKEND_URL}`, form);
      console.log(res);
    } catch (error) {
      console.error("Error submitting job:", error);
    }

    setForm({ company: "", role: "", appliedDate: "", status: "Applied", link: "" });
    fetchApplications();
  };

  return (
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
        <button type="submit" className="cursor-pointer p-2 rounded-sm sm:w-auto bg-gray-500 w-fit text-white">
          ➕ Add Application
        </button>
      </div>
    </form>
  );
};

export default JobForm;
