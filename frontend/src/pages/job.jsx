import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import './job.css'
const JobOpportunities = () => {
  const [activeTab, setActiveTab] = useState('fresher');
  const [jobs, setJobs] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    salary: '',
    requirements: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [resume, setResume] = useState(null);
  const [showApplyPopup, setShowApplyPopup] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const token = localStorage.getItem('token');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    fetchJobs();
    if (token) {
      const decoded = jwtDecode(token);
      setUserEmail(decoded.email);
    }
  }, [token]);

  const fetchJobs = async () => {
    try {
      const response = await axios.get('http://localhost:5000/jobs');
      setJobs(response.data);
    } catch (err) {
      setError('Failed to fetch jobs');
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setError('');
    setSuccess('');
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitJob = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/jobs', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSuccess('Job posted successfully!');
      setFormData({ title: '', description: '', location: '', salary: '', requirements: '' });
      fetchJobs();
    } catch (err) {
      setError('Failed to post job');
    }
  };

  const handleApply = (job) => {
    setSelectedJob(job);
    setShowApplyPopup(true);
  };

  const handleFileUpload = (e) => {
    setResume(e.target.files[0]);
  };

  const submitApplication = async () => {
    try {
      const formData = new FormData();
      formData.append('jobId', selectedJob.id);
      formData.append('resume', resume);
      
      await axios.post('http://localhost:5000/apply-job', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setSuccess('Application submitted successfully!');
      setShowApplyPopup(false);
      fetchJobs();
    } catch (err) {
      setError('Failed to submit application');
    }
  };

  return (
    <div className="job-page">
      <div className="header">
        <h1>Career Opportunities</h1>
        <div className="actions">
          <button
            className={`tab-btn ${activeTab === 'fresher' ? 'active' : ''}`}
            onClick={() => handleTabChange('fresher')}
          >
            Fresher Section
          </button>
          <button
            className={`tab-btn ${activeTab === 'recruiter' ? 'active' : ''}`}
            onClick={() => handleTabChange('recruiter')}
          >
            Recruiter Section
          </button>
        </div>
      </div>

      {error && <div className="alert error">{error}</div>}
      {success && <div className="alert success">{success}</div>}

      {activeTab === 'recruiter' ? (
        <div className="recruiter-section">
          <h2>Post a Job Opportunity</h2>
          <form onSubmit={handleSubmitJob} className="job-form">
            <input
              type="text"
              name="title"
              placeholder="Job Title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
            <textarea
              name="description"
              placeholder="Job Description"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="salary"
              placeholder="Salary Range"
              value={formData.salary}
              onChange={handleInputChange}
              required
            />
            <textarea
              name="requirements"
              placeholder="Requirements"
              value={formData.requirements}
              onChange={handleInputChange}
              required
            />
            <button type="submit" className="submit-btn">
              Post Job
            </button>
          </form>
        </div>
      ) : (
        <div className="fresher-section">
          <h2>Available Opportunities</h2>
          <div className="job-listings">
            {jobs.map((job) => (
              <div key={job.id} className="job-card">
                <h3>{job.title}</h3>
                <p>{job.description}</p>
                <div className="job-details">
                  <span>📍 {job.location}</span>
                  <span>💵 {job.salary}</span>
                </div>
                <div className="requirements">
                  <h4>Requirements:</h4>
                  <p>{job.requirements}</p>
                </div>
                {job.applicants && job.applicants.includes(userEmail) ? (
                  <button className="applied-btn" disabled>
                    ✓ Applied
                  </button>
                ) : (
                  <button className="apply-btn" onClick={() => handleApply(job)}>
                    Apply Now
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {showApplyPopup && (
        <div className="popup">
          <div className="popup-content">
            <h3>Apply for {selectedJob?.title}</h3>
            <input 
              type="file" 
              accept=".pdf,.doc,.docx" 
              onChange={handleFileUpload} 
            />
            <div className="popup-buttons">
              <button onClick={submitApplication} disabled={!resume}>
                Submit Application
              </button>
              <button onClick={() => setShowApplyPopup(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobOpportunities;