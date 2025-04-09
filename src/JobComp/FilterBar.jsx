import React from "react";

const FilterBar = ({ filter, setFilter }) => {
  return (
    <>
    <label className="block mb-2 text-sm font-medium text-gray-700">
    Filter by Status
  </label>
  <select
    value={filter}
    onChange={(e) => setFilter(e.target.value)}
    className="w-full max-w-xs p-2 border border-gray-300 rounded-md"
  >
    <option value="All">All</option>
    <option value="Applied">Applied</option>
    <option value="Interview">Interview</option>
    <option value="Offer">Offer</option>
    <option value="Rejected">Rejected</option>
  </select>
  </>
  );
};

export default FilterBar;
