import { useState } from "react";

const LearningResources = () => {
  const [message, setMessage] = useState("");
  const [posts, setPosts] = useState([]);
  const [activeDays, setActiveDays] = useState([3, 5, 7, 14, 21, 25]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [courseProgress, setCourseProgress] = useState({});

  // 15 Courses Data
  const courses = [
    { 
      id: 1,
      category: "AI/ML",
      title: "Machine Learning Fundamentals",
      desc: "Master core ML concepts and algorithms",
      rating: 4.8,
      enrolled: 2450
    },
    
    // ... (keep all other courses from previous example)
  ];

  const handleEnroll = (course) => {
    if (!enrolledCourses.some(c => c.id === course.id)) {
      setEnrolledCourses([...enrolledCourses, course]);
      setCourseProgress({
        ...courseProgress,
        [course.id]: 0
      });
    }
  };

  const handleProgressUpdate = (courseId) => {
    if (courseProgress[courseId] < 100) {
      setCourseProgress({
        ...courseProgress,
        [courseId]: courseProgress[courseId] + 10
      });
    }
  };

  const renderActivityCalendar = () => (
    <div className="grid grid-cols-7 gap-1 w-fit">
      {Array.from({ length: 30 }, (_, i) => (
        <div 
          key={i}
          className={`w-4 h-4 rounded-sm cursor-pointer
            ${activeDays.includes(i) ? 'bg-green-500' : 'bg-gray-200'}
            hover:opacity-75 transition-opacity`}
          onClick={() => setActiveDays([...activeDays, i])}
        />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Enhanced Header Section */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">Learning Resources Hub</h1>
        <h2 className="text-xl text-blue-600 font-medium">Hey Learner! 👋</h2>
        <p className="text-gray-500 mt-2">Expand your knowledge with our curated courses</p>
      </div>

      {/* My Courses Section */}
      {enrolledCourses.length > 0 && (
        <section className="mb-10 bg-white rounded-xl p-6 shadow-lg">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">My Learning Journey</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {enrolledCourses.map((course) => (
              <div key={course.id} className="bg-blue-50 p-5 rounded-xl hover:shadow-md transition-shadow">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-xl font-semibold text-gray-800">{course.title}</h3>
                  <span className="text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
                    {courseProgress[course.id]}% Complete
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
                  <div 
                    className="bg-gradient-to-r from-blue-400 to-blue-600 h-3 rounded-full transition-all duration-500" 
                    style={{ width: `${courseProgress[course.id]}%` }}
                  ></div>
                </div>
                <button
                  onClick={() => handleProgressUpdate(course.id)}
                  className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  disabled={courseProgress[course.id] >= 100}
                >
                  {courseProgress[course.id] >= 100 ? "Course Completed! 🎉" : "Mark Progress +10%"}
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Featured Courses Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Featured Learning Paths</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div key={course.id} className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="flex justify-between items-start mb-4">
                <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                  {course.category}
                </span>
                <div className="flex items-center">
                  <span className="text-yellow-400 text-lg">★</span>
                  <span className="ml-1 text-gray-600">{course.rating}</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">{course.title}</h3>
              <p className="text-gray-600 mb-4">{course.desc}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  🧑🎓 {course.enrolled.toLocaleString()} learners
                </span>
                <button 
                  onClick={() => handleEnroll(course)}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    enrolledCourses.some(c => c.id === course.id)
                      ? "bg-green-100 text-green-600 cursor-default"
                      : "bg-blue-100 text-blue-600 hover:bg-blue-200"
                  }`}
                  disabled={enrolledCourses.some(c => c.id === course.id)}
                >
                  {enrolledCourses.some(c => c.id === course.id) ? "Enrolled ✅" : "Start Learning →"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Learning Activity Section */}
      <section className="mb-12 bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Learning Activity</h2>
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-4">Monthly Progress</h3>
            {renderActivityCalendar()}
          </div>
          <div className="md:w-1/3 bg-gray-50 p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-4">Activity Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Active Days:</span>
                <span className="font-medium">{activeDays.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Courses Enrolled:</span>
                <span className="font-medium">{enrolledCourses.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Progress:</span>
                <span className="font-medium">
                  {Object.values(courseProgress).reduce((a, b) => a + b, 0)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Learning Community</h2>
        <div className="mb-8">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            placeholder="Ask a question, share a resource, or discuss a topic..."
            rows="4"
          />
          <button
            onClick={() => {
              if(message.trim()) {
                setPosts([...posts, {
                  content: message,
                  likes: 0,
                  timestamp: new Date().toLocaleString(),
                  comments: []
                }]);
                setMessage("");
              }
            }}
            className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors font-medium"
          >
            Post to Community
          </button>
        </div>
        
        <div className="space-y-6">
          {posts.map((post, index) => (
            <div key={index} className="border-2 border-gray-100 rounded-xl p-6 hover:border-blue-100 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600">👤</span>
                  </div>
                  <div>
                    <p className="font-medium">Community Learner</p>
                    <p className="text-sm text-gray-400">{post.timestamp}</p>
                  </div>
                </div>
                <span className="text-sm text-gray-400">{post.likes} upvotes</span>
              </div>
              <p className="text-gray-800 mb-4">{post.content}</p>
              <div className="flex gap-4">
                <button
                  onClick={() => {
                    const newPosts = [...posts];
                    newPosts[index].likes += 1;
                    setPosts(newPosts);
                  }}
                  className="flex items-center gap-2 text-gray-500 hover:text-blue-500"
                >
                  <span>↑</span>
                  <span>Upvote</span>
                </button>
                <button className="text-gray-500 hover:text-green-500">
                  💬 Comment
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LearningResources;