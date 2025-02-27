
import React from "react";
import "./Dashboard.css";

const Dashboard = () => {
    return (
        <div className="dashboard">
            <h1>Dashboard</h1>
            <p>Dashboard &gt; Home</p>

            <div className="section">
                <div className="card">
                    <h3>Job Opportunities</h3>
                    <p>Find industry-relevant jobs, internships, and freelance gigs.</p>
                </div>
                <div className="card">
                    <h3>Expert-Led Learning</h3>
                    <p>Gain insights from top industry professionals through structured courses and mentorship.</p>
                </div>
                <div className="card">
                    <h3>Pitch Your Ideas</h3>
                    <p>Share startup ideas via video, making it easier for investors to discover and support your projects.</p>
                </div>
                <div className="card">
                    <h3>Expert Diaries</h3>
                    <p>Tune in to industry leaders sharing insights on market trends, skills, and entrepreneurial success.</p>
                </div>
                <div className="card">
                    <h3>AI Co-Founder Matchmaking</h3>
                    <p>No team? No problem! Connect with like-minded entrepreneurs, find your perfect match, and collaborate on projects.</p>
                </div>
            </div>

            <h2>Course Suggestions</h2>
            <div className="section">
                <div className="card">
                    <h3>Web Development</h3>
                    <p>Learn HTML, CSS, JavaScript, and more to build modern web applications.</p>
                </div>
                <div className="card">
                    <h3>Data Science</h3>
                    <p>Master data analysis, visualization, and machine learning techniques.</p>
                </div>
                <div className="card">
                    <h3>Digital Marketing</h3>
                    <p>Learn SEO, SEM, social media marketing, and content strategy.</p>
                </div>
                <div className="card">
                    <h3>Project Management</h3>
                    <p>Gain skills in project planning, execution, and team management.</p>
                </div>
                <div className="card">
                    <h3>Graphic Design</h3>
                    <p>Learn design principles, tools, and techniques to create stunning visuals.</p>
                </div>
                <div className="card">
                    <h3>Language Learning</h3>
                    <p>Master new languages and enhance your communication skills.</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;