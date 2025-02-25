import React, { useState } from 'react';
import './JobPage.css';

const JobPage = () => {
  const [filter, setFilter] = useState('all');

  const jobs = [
    {
      title: "Back End Developer",
      company: "Lecon Innovative Pvt Ltd",
      applied: 233,
      daysLeft: 27,
      category: "Software Development"
    },
    {
      title: "Software Engineer",
      company: "Website Corporation",
      views: 4807,
      daysLeft: 7,
      category: "Software Development"
    },
    {
      title: "Systems Engineer - Trading Platform",
      company: "Risgo Capital",
      views: 238,
      daysLeft: 2,
      category: "Software Development"
    },
    {
      title: "AI Prompt Engineer",
      company: "Unman Enterprise AI Search",
      applied: 433,
      daysLeft: 19,
      category: "Data Science"
    }
  ];

  const filteredJobs = filter === 'all' ? jobs : jobs.filter(job => job.category === filter);

  return (
    
    <div className="job-page">
      <header className="header">
        <h1>Unlock Ambition</h1>
        <p>Apply to a plethora of hiring opportunities & work with your dream companies!</p>
        <div className="actions">
          <button className="find-jobs">Find Jobs</button>
          <button className="post-jobs">Post Jobs</button>
        </div>
      </header>

      <section className="job-categories">
        <h2>Jobs Category</h2>
        <div className="categories">
          <button onClick={() => setFilter('all')}>All</button>
          <button onClick={() => setFilter('Software Development')}>Software Development</button>
          <button onClick={() => setFilter('Data Science')}>Data Science</button>
          <button onClick={() => setFilter('Graphic Design')}>Graphic Design</button>
          <button onClick={() => setFilter('Marketing')}>Marketing</button>
          <button onClick={() => setFilter('Finance')}>Finance</button>
        </div>
      </section>

      <section className="recommended-jobs">
        <h2>Recommended Jobs FOR YOU</h2>
        <p>Looking for the best of the best? Here're the top-rated Jobs by the learners' community.</p>
        <div className="job-listings">
          {filteredJobs.map((job, index) => (
            <div key={index} className="job-card">
              <h3>{job.title}</h3>
              <p>{job.company}</p>
              {job.applied && <p>▲ {job.applied} Applied</p>}
              {job.views && <p>▲ {job.views} Views</p>}
              <p>{job.daysLeft} days left</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default JobPage;