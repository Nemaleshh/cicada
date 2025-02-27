import React, { useEffect, useState } from 'react';
import './dashboard.css';

const Dashboard = () => {
  const [userStats, setUserStats] = useState({
    skillsCompleted: 0,
    learningHours: 0,
    mentorSessions: 0,
    jobApplications: 0,
    activeProjects: 0, // Initialize as 0
  });
  const [recentActivities, setRecentActivities] = useState([]);
  const [skillProgress, setSkillProgress] = useState([
    { skill: 'JavaScript', progress: 22 },
    { skill: 'React', progress: 27 },
    { skill: 'Node.js', progress: 19 },
    { skill: 'CSS', progress: 45 },
    { skill: 'HTML', progress: 69 },
  ]); // Default skill progress with 30%
  const [activeProjects, setActiveProjects] = useState([]); // State for active projects
  const [email, setEmail] = useState('nemu@gmail.com'); // Replace with the logged-in user's email
  const [newProject, setNewProject] = useState({ title: '', description: '' }); // State for new project input

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user statistics
        const statsResponse = await fetch(`http://localhost:5000/api/user-stats?email=${email}`);
        const statsData = await statsResponse.json();
        setUserStats(statsData);

        // Fetch recent activities
        const activitiesResponse = await fetch(`http://localhost:5000/api/recent-activities?email=${email}`);
        const activitiesData = await activitiesResponse.json();
        setRecentActivities(activitiesData);

        // Fetch active projects
        const projectsResponse = await fetch(`http://localhost:5000/api/active-projects?email=${email}`);
        const projectsData = await projectsResponse.json();
        setActiveProjects(projectsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [email]);

  const handleProjectChange = (e) => {
    const { name, value } = e.target;
    setNewProject((prev) => ({ ...prev, [name]: value }));
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/active-projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, project: newProject }),
      });

      if (response.ok) {
        const addedProject = await response.json();
        setActiveProjects((prev) => [...prev, addedProject.project]); // Update the active projects state
        setUserStats((prev) => ({
          ...prev,
          activeProjects: prev.activeProjects + 1, // Increment the active projects count
        }));
        setNewProject({ title: '', description: '' }); // Reset the form
      } else {
        console.error('Failed to add project');
      }
    } catch (error) {
      console.error('Error adding project:', error);
    }
  };

  const handleDeleteProject = async (projectTitle) => {
    try {
      const response = await fetch('http://localhost:5000/api/active-projects', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, projectTitle }),
      });

      if (response.ok) {
        // Remove the project from the state
        setActiveProjects((prev) => prev.filter((p) => p.title !== projectTitle));
        // Update the userStats.activeProjects count
        setUserStats((prev) => ({
          ...prev,
          activeProjects: prev.activeProjects - 1,
        }));
      } else {
        console.error('Failed to delete project');
      }
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  return (
    <div className="dashboard-container">
      {/* Dashboard Header */}
      <header className="dashboard-header">
        <h1>Welcome Back, Learner!</h1>
        <div className="quick-stats">
          <div className="stat-item">
            <span className="stat-number">{userStats.skillsCompleted}</span>
            <span className="stat-label">Skills Mastered</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{userStats.learningHours}h</span>
            <span className="stat-label">Learning Hours</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{userStats.activeProjects}</span>
            <span className="stat-label">Projects</span>
          </div>
        </div>
      </header>

      {/* Main Dashboard Content */}
      <main className="dashboard-main">
        {/* Left Column */}
        <div className="dashboard-column">
          {/* Learning Progress */}
          <section className="dashboard-card">
            <h2>Learning Progress</h2>
            <div className="progress-bars">
              {skillProgress.map((skill, index) => (
                <div key={index} className="progress-item">
                  <div className="progress-header">
                    <span>{skill.skill}</span>
                    <span>{skill.progress}%</span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${skill.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Active Projects */}
          <section className="dashboard-card">
            <h2>Active Projects</h2>
            <div className="project-list">
              {activeProjects.map((project, index) => (
                <div key={index} className="project-item">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-status">
                    <span className="status-indicator in-progress"></span>
                    <span>In Development</span>
                  </div>
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteProject(project.title)}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Add New Project Form */}
          <section className="dashboard-card">
            <h2>Add New Project</h2>
            <form onSubmit={handleProjectSubmit}>
              <input
                type="text"
                name="title"
                placeholder="Project Title"
                value={newProject.title}
                onChange={handleProjectChange}
                required
              />
              <textarea
                name="description"
                placeholder="Project Description"
                value={newProject.description}
                onChange={handleProjectChange}
                required
              />
              <button type="submit">Add Project</button>
            </form>
          </section>
        </div>

        {/* Right Column */}
        <div className="dashboard-column">
          {/* Recent Activity */}
          <section className="dashboard-card">
            <h2>Recent Activity</h2>
            <div className="activity-feed">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="activity-item">
                  <div className={`activity-icon ${activity.type}`}></div>
                  <div className="activity-content">
                    <h4>{activity.title}</h4>
                    <p className="activity-date">{activity.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Quick Actions */}
          <section className="dashboard-card">
            <h2>Quick Actions</h2>
            <div className="action-buttons">
              <button className="action-btn">
                <span className="btn-icon">+</span>
                Submit New Idea
              </button>
              <button className="action-btn">
                <span className="btn-icon">📚</span>
                Continue Learning
              </button>
              <button className="action-btn">
                <span className="btn-icon">💼</span>
                View Job Matches
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;