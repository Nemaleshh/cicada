// FresherPage.jsx
import React, { useState } from 'react';
import './FresherPage.css';

const FresherPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [jobs, setJobs] = useState([
    {
      id: 1,
      role: 'Frontend Developer',
      experience: '0-2 years',
      city: 'Bangalore',
      company: 'Tech Corp',
      salary: '₹6-8 LPA',
      incentive: '₹50,000 joining bonus',
      image: 'https://via.placeholder.com/80'
    },
    {
      id: 2,
      role: 'Backend Engineer',
      experience: '1-3 years',
      city: 'Mumbai',
      company: 'Code Masters',
      salary: '₹8-10 LPA',
      incentive: '₹75,000 referral bonus',
      image: 'https://via.placeholder.com/80'
    }
  ]);

  const filteredJobs = jobs.filter(job =>
    job.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-blue-800 mb-4">Fresher Opportunities</h1>
        <p className="text-lg text-gray-600">Kickstart your career with exciting opportunities</p>
      </div>

      <div className="mb-8">
        <input
          type="text"
          placeholder="🔍 Search jobs by role, company, or location"
          className="w-full p-4 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-blue-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.map(job => (
          <div key={job.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <img src={job.image} alt={job.company} className="w-20 h-20 object-cover rounded-lg mr-4"/>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{job.role}</h3>
                  <p className="text-gray-600">{job.company}</p>
                </div>
              </div>
              
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Experience:</span> {job.experience}</p>
                <p><span className="font-medium">Location:</span> {job.city}</p>
                <p><span className="font-medium">Salary:</span> {job.salary}</p>
                <p className="text-green-600 font-medium">{job.incentive}</p>
              </div>

              <button className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                Apply Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FresherPage;