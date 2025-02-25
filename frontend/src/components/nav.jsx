import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const userData = JSON.parse(atob(token.split(".")[1])); // Decode JWT
      setUser(userData);
    }
  }, []);

  const handleNavigation = () => {
    if (user?.role === "Fresher") {
      navigate("/job");
    } else if (user?.role === "Recruiter") {
      navigate("/job-rec");
    }
  };

  return (
    <nav className="p-4 bg-blue-500 text-white flex justify-between">
      <div className="text-xl font-bold">My App</div>
      <ul className="flex space-x-4">
        <li onClick={() => navigate("/dashboard")} className="cursor-pointer">Dashboard</li>
        <li onClick={() => navigate("/learning")} className="cursor-pointer">Learning</li>
        <li onClick={handleNavigation} className="cursor-pointer">Jobs</li>
        <li onClick={() => navigate("/signin")} className="cursor-pointer">Sign In</li>
      </ul>
    </nav>
  );
};

export default Navbar;
