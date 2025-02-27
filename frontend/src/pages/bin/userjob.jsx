import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const UserJobs = () => {
  const [jobs, setJobs] = useState([]); // Stores the list of jobs
  const [error, setError] = useState(""); // Error message
  const [success, setSuccess] = useState(""); // Success message
  const [showPopup, setShowPopup] = useState(false); // Controls popup visibility
  const [selectedJobId, setSelectedJobId] = useState(null); // Stores the job ID for which the user is applying
  const [resume, setResume] = useState(null); // Stores the uploaded resume file
  const [hasResume, setHasResume] = useState(false); // Tracks if the user has already uploaded a resume
  const token = localStorage.getItem("token"); // Retrieve JWT token from local storage
  const [userEmail, setUserEmail] = useState(""); // Stores the logged-in user's email

  // Fetch jobs and user email on component mount
  useEffect(() => {
    fetchJobs();
    if (token) {
      const decoded = jwtDecode(token); // Decode the JWT token
      setUserEmail(decoded.email); // Set the user's email from the token
      checkResume(decoded.email); // Check if the user has already uploaded a resume
    }
  }, [token]);

  // Fetch all jobs from the server
  const fetchJobs = async () => {
    try {
      const response = await axios.get("http://localhost:5000/jobs", {
        headers: { Authorization: `Bearer ${token}` }, // Include JWT token in the request
      });
      setJobs(response.data); // Update the jobs state with the fetched data
    } catch (err) {
      setError("Failed to fetch jobs"); // Handle errors
    }
  };

  // Check if the user has already uploaded a resume
  const checkResume = async (email) => {
    try {
      const response = await axios.get(`http://localhost:5000/check-resume/${email}`, {
        headers: { Authorization: `Bearer ${token}` }, // Include JWT token in the request
      });
      setHasResume(response.data.hasResume); // Set the hasResume state
    } catch (err) {
      setError("Failed to check resume status"); // Handle errors
    }
  };

  // Handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResume(file); // Set the resume file
    }
  };

  // Apply for a job
  const applyJob = async (jobId) => {
    setSelectedJobId(jobId); // Set the selected job ID
    if (!hasResume) {
      setShowPopup(true); // Show the popup if the user hasn't uploaded a resume
    } else {
      submitApplication(jobId); // Submit the application if the resume is already uploaded
    }
  };

  // Submit the application
  const submitApplication = async (jobId) => {
    try {
      const formData = new FormData();
      formData.append("jobId", jobId);
      if (resume) {
        formData.append("resume", resume); // Append the resume file
      }
  
      const response = await axios.post(
        "http://localhost:5000/apply-job",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data", // Set content type for file upload
          },
        }
      );
  
      setSuccess("Applied for job successfully"); // Show success message
      setShowPopup(false); // Hide the popup
      fetchJobs(); // Refresh the jobs list
      setHasResume(true); // Update the resume status
    } catch (err) {
      setError("Failed to apply for job"); // Handle errors
    }
  };

  return (
    <div>
      <h1>Available Jobs</h1>
      {/* Display error and success messages */}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      {/* List of Jobs */}
      <div>
        {jobs.map((job) => (
          <div
            key={job.id}
            style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}
          >
            <h3>{job.title}</h3>
            <p>{job.description}</p>
            <p>Location: {job.location}</p>
            <p>Salary: {job.salary}</p>
            {/* Apply Button */}
            {job.applicants && job.applicants.includes(userEmail) ? (
              <button disabled style={{ backgroundColor: "gray" }}>
                Applied
              </button>
            ) : (
              <button onClick={() => applyJob(job.id)}>Apply</button>
            )}
          </div>
        ))}
      </div>

      {/* Popup for Resume Upload */}
      {showPopup && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            zIndex: 1000,
          }}
        >
          <h3>Upload Your Resume</h3>
          <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileUpload} />
          <button
            onClick={() => submitApplication(selectedJobId)}
            disabled={!resume}
          >
            Submit
          </button>
          <button onClick={() => setShowPopup(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default UserJobs;