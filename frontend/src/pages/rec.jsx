import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const RecruiterJobs = () => {
  const [jobs, setJobs] = useState([]); // Stores the list of jobs
  const [title, setTitle] = useState(""); // Job title input
  const [description, setDescription] = useState(""); // Job description input
  const [location, setLocation] = useState(""); // Job location input
  const [salary, setSalary] = useState(""); // Job salary input
  const [error, setError] = useState(""); // Error message
  const [success, setSuccess] = useState(""); // Success message
  const [applicants, setApplicants] = useState([]); // Stores applicants for a job
  const token = localStorage.getItem("token"); // Retrieve JWT token from local storage
  const [recruiterEmail, setRecruiterEmail] = useState(""); // Stores the logged-in recruiter's email

  // Fetch jobs and recruiter email on component mount
  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token); // Decode the JWT token
      setRecruiterEmail(decoded.email); // Set the recruiter's email from the token
      fetchJobs(decoded.email); // Fetch jobs posted by this recruiter
    }
  }, [token]);

  // Fetch jobs posted by the logged-in recruiter
  const fetchJobs = async (email) => {
    try {
      const response = await axios.get("http://localhost:5000/jobs", {
        headers: { Authorization: `Bearer ${token}` }, // Include JWT token in the request
      });
      // Filter jobs to show only those posted by the logged-in recruiter
      const recruiterJobs = response.data.filter((job) => job.postedBy === email);
      setJobs(recruiterJobs); // Update the jobs state with the filtered data
    } catch (err) {
      setError("Failed to fetch jobs"); // Handle errors
    }
  };

  // Post a new job
  const postJob = async () => {
    if (!title || !description || !location || !salary) {
      setError("All fields are required"); // Validate input fields
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/post-job",
        { title, description, location, salary },
        { headers: { Authorization: `Bearer ${token}` } } // Include JWT token in the request
      );
      setSuccess("Job posted successfully"); // Show success message
      setJobs([...jobs, response.data.job]); // Add the new job to the jobs list
      // Clear the form fields
      setTitle("");
      setDescription("");
      setLocation("");
      setSalary("");
    } catch (err) {
      setError("Failed to post job"); // Handle errors
    }
  };

  // View applicants for a job
  const viewApplicants = async (jobId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/job-applicants/${jobId}`,
        { headers: { Authorization: `Bearer ${token}` } } // Include JWT token in the request
      );
      setApplicants(response.data.applicants); // Set the applicants state
    } catch (err) {
      setError("Failed to fetch applicants"); // Handle errors
    }
  };

  return (
    <div>
      <h1>Recruiter Dashboard</h1>
      {/* Display error and success messages */}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      {/* Post Job Form */}
      <div>
        <h2>Post a Job</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <input
          type="text"
          placeholder="Salary"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
        />
        <button onClick={postJob}>Post Job</button>
      </div>

      {/* List of Jobs */}
      <div>
        <h2>Posted Jobs</h2>
        {jobs.map((job) => (
          <div
            key={job.id}
            style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}
          >
            <h3>{job.title}</h3>
            <p>{job.description}</p>
            <p>Location: {job.location}</p>
            <p>Salary: {job.salary}</p>
            <button onClick={() => viewApplicants(job.id)}>View Applicants</button>
            {/* Display applicants */}
            {applicants.length > 0 && (
              <div>
                <h4>Applicants:</h4>
                <ul>
                  {applicants.map((applicant, index) => (
                    <li key={index}>{applicant}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecruiterJobs;