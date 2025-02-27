import React, { useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import "./learning.css"
Chart.register(...registerables);

const LearningResources = () => {
  const [courses] = useState([
    { id: 1, title: "ChatGPT Complete Guide", author: "Julian Melanson", price: "¥499 ¥29,999", rating: 4.5 },
    { id: 2, title: "AI-Powered Copywriting", author: "Ing. Tomas Moravek", price: "¥499 ¥39,999", rating: 4.2 },
    { id: 3, title: "Marketing Tools", author: "Anton Voronik", price: "¥499 ¥799", rating: 4.5 },
    { id: 4, title: "SEO With ChatGPT", author: "Anton Voronik", price: "¥499 ¥799", rating: 4.4 },
    { id: 5, title: "Python for Data Science", author: "John Doe", price: "¥499 ¥19,999", rating: 4.7 },
    { id: 6, title: "Full Stack Web Development", author: "Jane Smith", price: "¥499 ¥24,999", rating: 4.8 },
    { id: 7, title: "Data Science with Python", author: "Michael Johnson", price: "¥499 ¥22,999", rating: 4.6 },
    { id: 8, title: "Machine Learning A-Z", author: "Andrew Ng", price: "¥499 ¥27,999", rating: 4.9 },
    { id: 9, title: "Deep Learning Specialization", author: "Geoffrey Hinton", price: "¥499 ¥32,999", rating: 4.8 },
    { id: 10, title: "Natural Language Processing", author: "Steven Bird", price: "¥499 ¥21,999", rating: 4.7 }
  ]);

  const [completedCourses] = useState(5);
  const [enrolledCourses] = useState(8);

  const chartData = {
    labels: ['Completed', 'Remaining'],
    datasets: [{
      data: [completedCourses, 12 - completedCourses],
      backgroundColor: ['#4CAF50', '#FF6384']
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false
  };

  return (
    <div className="learning-container">
      <h1 className="title">Learning Resources</h1>
      <p className="welcome">Welcome, nemu</p>

      <div className="courses-grid">
        {courses.map(course => (
          <div key={course.id} className="course-card">
            <h2>{course.title}</h2>
            <p>{course.author}</p>
            <p>{course.price}</p>
            <div className="course-rating">Rating: {course.rating} ★</div>
            <div className="buttons">
              <button className="complete-btn">Mark as Completed</button>
              <button className="enroll-btn">Enroll Now</button>
            </div>
          </div>
        ))}
      </div>

      <div className="stats">
        <h2>Your Courses</h2>
        <p>Completed Courses: {completedCourses}</p>
        <p>Enrolled Courses: {enrolledCourses}</p>
      </div>

      <div className="progress-tracker">
        <h2>Learning Progress Tracker</h2>
        <div className="chart">
          <Doughnut data={chartData} options={options} />
        </div>
        <div className="progress-stats">
          <p>Total Courses: 12</p>
          <p>Completed Courses: {completedCourses}</p>
          <p>Progress Percentage: {(completedCourses / 12 * 100).toFixed(2)}%</p>
        </div>
      </div>
    </div>
  );
};

export default LearningResources;