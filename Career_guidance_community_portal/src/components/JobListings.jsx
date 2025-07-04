import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

function JobListings() {
  const navigate = useNavigate();
  const [appliedJob, setAppliedJob] = useState(null);

  const jobs = [
    { id: 1, title: "Software Engineer", company: "Google" },
    { id: 2, title: "Data Analyst", company: "Microsoft" },
    { id: 3, title: "Product Manager", company: "Amazon" },
    { id: 4, title: "AI Researcher", company: "OpenAI" },
  ];

  const handleApply = (company) => {
    setAppliedJob(company);
    navigate(`/apply/${company.toLowerCase()}`);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Job Listings</h2>
      <p className="text-center">Find job opportunities from top companies and apply instantly.</p>

      <div className="card p-4">
        <h4>Available Jobs</h4>
        <ul className="list-group">
          {jobs.map((job) => (
            <li key={job.id} className="list-group-item d-flex justify-content-between align-items-center">
              {job.title} - {job.company}
              <button className="btn btn-success" onClick={() => handleApply(job.company)}>
                Apply
              </button>
            </li>
          ))}
        </ul>
        <button className="btn btn-secondary mt-3" onClick={() => navigate("/jobs")}>
          View More Jobs
        </button>
      </div>

      {appliedJob && (
        <div className="alert alert-success mt-3" role="alert">
          You have successfully applied for a job at <strong>{appliedJob}</strong>!
        </div>
      )}
    </div>
  );
}

export default JobListings;
