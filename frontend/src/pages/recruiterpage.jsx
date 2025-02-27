// RecruiterPage.jsx
import React, { useState } from 'react';
import './RecruiterPage.css';

const RecruiterPage = () => {
  const [viewMode, setViewMode] = useState('post');
  const [jobsPosted, setJobsPosted] = useState([]);
  const [formData, setFormData] = useState({
    role: '',
    experience: '',
    city: '',
    company: '',
    salary: '',
    incentive: '',
    image: null
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newJob = { ...formData, id: Date.now() };
    setJobsPosted([...jobsPosted, newJob]);
    setFormData({
      role: '',
      experience: '',
      city: '',
      company: '',
      salary: '',
      incentive: '',
      image: null
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-green-800 mb-4">Recruiter Portal</h1>
        <p className="text-lg text-gray-600">Find the best talent for your organization</p>
      </div>

      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => setViewMode('post')}
          className={`px-6 py-2 rounded-lg ${
            viewMode === 'post' 
              ? 'bg-green-600 text-white' 
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          Post Jobs
        </button>
        <button
          onClick={() => setViewMode('view')}
          className={`px-6 py-2 rounded-lg ${
            viewMode === 'view' 
              ? 'bg-green-600 text-white' 
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          View Posted Jobs
        </button>
      </div>

      {viewMode === 'post' ? (
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Job Role</label>
              <input
                type="text"
                required
                className="w-full p-2 border rounded-lg"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
              <input
                type="text"
                required
                className="w-full p-2 border rounded-lg"
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <input
                type="text"
                required
                className="w-full p-2 border rounded-lg"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
              <input
                type="text"
                required
                className="w-full p-2 border rounded-lg"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Salary</label>
              <input
                type="text"
                required
                className="w-full p-2 border rounded-lg"
                value={formData.salary}
                onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Incentives</label>
              <input
                type="text"
                className="w-full p-2 border rounded-lg"
                value={formData.incentive}
                onChange={(e) => setFormData({ ...formData, incentive: e.target.value })}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Company Logo</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full p-2 border rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
          >
            Post Job
          </button>
        </form>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobsPosted.map(job => (
            <div key={job.id} className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  {job.image && (
                    <img src={job.image} alt={job.company} className="w-20 h-20 object-cover rounded-lg mr-4"/>
                  )}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{job.role}</h3>
                    <p className="text-gray-600">{job.company}</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Experience:</span> {job.experience}</p>
                  <p><span className="font-medium">Location:</span> {job.city}</p>
                  <p><span className="font-medium">Salary:</span> {job.salary}</p>
                  {job.incentive && <p className="text-green-600">{job.incentive}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecruiterPage;