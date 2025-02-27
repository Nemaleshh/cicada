import React, { useState, useEffect } from "react";
import axios from "axios";
import "./rec.css";

const Rec = () => {
  const [jobs, setJobs] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    location: "",
    mode: "Online",
    salary: "",
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get("http://localhost:5000/jobs");
      setJobs(response.data);
    } catch (error) {
      console.error("Error fetching jobs", error);
    }
  };

  const fetchApplicants = async (jobId) => {
    try {
      setSelectedJobId(jobId);
      const response = await axios.get(`http://localhost:5000/applicants/${jobId}`);
      setApplicants(response.data.message === "0 applicants" ? [] : response.data);
    } catch (error) {
      console.error("Error fetching applicants", error);
    }
  };

  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/post-job", jobData);
      fetchJobs(); // Refresh job list
      setJobData({ title: "", description: "", location: "", mode: "Online", salary: "" });
    } catch (error) {
      console.error("Error posting job", error);
    }
  };

  return (
    <div>
      <h1>Recruiter Dashboard</h1>

      {/* Job Posting Form */}
      <h2>Post a Job</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Title" value={jobData.title} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" value={jobData.description} onChange={handleChange} required />
        <input type="text" name="location" placeholder="Location" value={jobData.location} onChange={handleChange} required />
        <select name="mode" value={jobData.mode} onChange={handleChange}>
          <option value="Online">Online</option>
          <option value="Offline">Offline</option>
          <option value="Hybrid">Hybrid</option>
        </select>
        <input type="text" name="salary" placeholder="Salary" value={jobData.salary} onChange={handleChange} required />
        <button type="submit">Post Job</button>
      </form>

      {/* Job Listings */}
      <h2>Posted Jobs</h2>
      <ul>
        {jobs.map((job) => (
          <li key={job.id}>
            <h3>{job.title}</h3>
            <p>{job.description}</p>
            <p><strong>Location:</strong> {job.location}</p>
            <p><strong>Mode:</strong> {job.mode}</p>
            <p><strong>Salary:</strong> {job.salary}</p>
            <button onClick={() => fetchApplicants(job.id)}>View Applicants</button>
          </li>
        ))}
      </ul>

      {/* Applicants Section */}
      <h2>Applicants for Selected Job</h2>
      {selectedJobId && (
        applicants.length > 0 ? (
          <ul>
            {applicants.map((applicant, index) => (
              <li key={index}>
                <p><strong>Name:</strong> {applicant.name}</p>
                <p><strong>Email:</strong> {applicant.email}</p>
                {applicant.resume && (
                  <p>
                    <strong>Resume:</strong> <a href={`http://localhost:5000/${applicant.resume}`} target="_blank" rel="noopener noreferrer">View Resume</a>
                  </p>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No applicants</p>
        )
      )}
    </div>
  );
};

export default Rec;
