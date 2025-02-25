import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import "./learning.css";

Chart.register(...registerables);

const Learning = () => {
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);
  const [completedCourses, setCompletedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDomain, setSelectedDomain] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await fetch("http://localhost:5000/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setUser(data);
        setCompletedCourses(data.completedCourses || []);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:5000/courses", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchUserData();
    fetchCourses();
  }, []);

  const handleCompleteCourse = async (courseId) => {
    try {
      const response = await fetch("http://localhost:5000/complete-course", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ courseId }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setCompletedCourses(data.completedCourses);
      setUser((prevUser) => ({
        ...prevUser,
        completedCourses: data.completedCourses,
      }));
    } catch (error) {
      console.error("Error completing course:", error);
    }
  };

  const handleDomainClick = (domain) => {
    setSelectedDomain(domain);
  };

  const filteredCourses = selectedDomain
    ? courses.filter((course) => course.domain === selectedDomain)
    : courses;

  useEffect(() => {
    setUser((prevUser) => ({
      ...prevUser,
      completedCourses,
    }));
  }, [completedCourses]);

  const totalCourses = courses.length;
  const completedCount = completedCourses.length;
  const progressPercentage = totalCourses > 0 ? ((completedCount / totalCourses) * 100).toFixed(2) : 0;

  const doughnutChartData = {
    labels: ["Completed", "Remaining"],
    datasets: [
      {
        data: [completedCount, totalCourses - completedCount],
        backgroundColor: ["#4caf50", "#ddd"],
        borderWidth: 1,
      },
    ],
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="learning-container">
      <h1>Learning Resources</h1>
      {user && <h2>Welcome, {user.name}</h2>}

      <div className="domain-filters">
        <button onClick={() => handleDomainClick(null)}>All</button>
        <button onClick={() => handleDomainClick("Data Science")}>Data Science</button>
        <button onClick={() => handleDomainClick("Machine Learning")}>Machine Learning</button>
        <button onClick={() => handleDomainClick("AI")}>AI</button>
        <button onClick={() => handleDomainClick("Full Stack")}>Full Stack</button>
      </div>

      <div className="courses-list">
        {filteredCourses.map((course, index) => (
          <div key={index} className="course-card">
            <img src={course.img} alt={course.name} className="course-image" />
            <div className="course-details">
              <h2>{course.name}</h2>
              <p>Author: {course.author}</p>
              <p>Price: {course.price}</p>
              <p>Rating: {course.rating}</p>
              {completedCourses.includes(course.name) ? (
                <p className="completed">Completed</p>
              ) : (
                <button onClick={() => handleCompleteCourse(course.name)} className="course-link">
                  Mark as Completed
                </button>
              )}
              <a href={course.link} target="_blank" rel="noopener noreferrer" className="course-link">
                {completedCourses.includes(course.name) ? "Enroll Again" : "Enroll Now"}
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="progress-container">
        <div className="user-report">
          <h3>Your Learning Progress</h3>
          <p>Total Courses: {totalCourses}</p>
          <p>Completed Courses: {completedCount}</p>
          <p>Progress: {progressPercentage}%</p>
        </div>

        <div className="chart-container">
          <h3>Course Completion Status</h3>
          <Doughnut data={doughnutChartData} />
        </div>
      </div>
    </div>
  );
};

export default Learning;
