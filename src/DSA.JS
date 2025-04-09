


// 🧠 DSA Solution (Problem 2: Status Frequency Counter)


function getStatusFrequency(applications) {
  const freq = {};
  for (const app of applications) {
    const status = app.status;
    freq[status] = (freq[status] || 0) + 1;
  }
  return freq;
}

// ✅ Example
const data = [
  { company: "Google", status: "Applied" },
  { company: "Meta", status: "Rejected" },
  { company: "Netflix", status: "Applied" },
  { company: "Amazon", status: "Interview" },
];

console.log(getStatusFrequency(data));
// Output: { Applied: 2, Rejected: 1, Interview: 1 }
