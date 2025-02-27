import React, { useState } from "react";

const coursesData = [
  { category: "Web Development", name: "React Basics", image: "https://via.placeholder.com/150" },
  { category: "CSE", name: "Data Structures", image: "https://via.placeholder.com/150" },
  { category: "AI/ML", name: "Machine Learning", image: "https://via.placeholder.com/150" }
];

const Learn = () => {
  const [rating, setRating] = useState(0);
  const [enrolledCourses, setEnrolledCourses] = useState(3);
  const [progress, setProgress] = useState(60); // In percentage

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex justify-center items-center">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-xl p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800">Welcome, User!</h1>

        {/* Courses Section */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Courses</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {coursesData.map((course, index) => (
              <div key={index} className="bg-gray-100 p-4 rounded-lg text-center shadow-md hover:shadow-lg transition">
                <img src={course.image} alt={course.name} className="w-full h-32 object-cover rounded-md" />
                <h3 className="mt-3 text-lg font-semibold text-gray-800">{course.name}</h3>
                <p className="text-sm text-gray-600">Category: {course.category}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Rating Section */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-700">Rate Your Experience</h2>
          <div className="flex justify-center mt-3 space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star} onClick={() => setRating(star)} 
                className={`text-3xl cursor-pointer transition ${star <= rating ? "text-yellow-500" : "text-gray-400"}`}>
                ★
              </span>
            ))}
          </div>
        </div>

        {/* Enrolled Courses Section */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-700">Enrolled Courses</h2>
          <p className="text-gray-600">You have enrolled in <span className="font-bold text-gray-800">{enrolledCourses}</span> courses.</p>
        </div>

        {/* Progress Tracker */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-700">Progress Tracker</h2>
          <div className="w-full bg-gray-300 rounded-full h-6 mt-3 relative overflow-hidden">
            <div className="bg-green-500 h-full rounded-full text-white flex items-center justify-center transition-all" 
              style={{ width: `${progress}%` }}>
              {progress}%
            </div>
          </div>
        </div>

        {/* Peer Interaction Section */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-700">Peer Interaction</h2>
          <p className="text-gray-600">Connect with fellow learners and discuss topics!</p>
        </div>
      </div>
    </div>
  );
};

export default Learn;