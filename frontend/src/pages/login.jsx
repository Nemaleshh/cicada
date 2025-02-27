import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import logo from "../assets/logo.png";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    field: "Fresher",
    email: "",
    password: "",
  });
  const [resumeFile, setResumeFile] = useState(null); // State for resume file
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setResumeFile(e.target.files[0]); // Store the selected file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const response = await axios.post("http://localhost:5000/login", {
          email: formData.email,
          password: formData.password,
        });
        if (response.data.success) {
          localStorage.setItem("token", response.data.token);
          navigate("/dashboard");
        }
      } else {
        const formDataToSend = new FormData();
        formDataToSend.append("name", formData.name);
        formDataToSend.append("age", formData.age);
        formDataToSend.append("field", formData.field);
        formDataToSend.append("email", formData.email);
        formDataToSend.append("password", formData.password);

        // Append resume file only if the field is "Fresher"
        if (formData.field === "Fresher" && resumeFile) {
          formDataToSend.append("resume", resumeFile);
        }

        const response = await axios.post("http://localhost:5000/signup", formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data", // Required for file uploads
          },
        });

        alert(response.data.message);
        setIsLogin(true);
      }
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="logo-container">
          <img src={logo} alt="Cicada Logo" className="logo" />
          <div className="tagline">Build Your Future</div>
        </div>

        <h2 className="title">{isLogin ? "Login" : "Sign Up"}</h2>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Age</label>
                <input
                  type="number"
                  name="age"
                  placeholder="Enter your age"
                  value={formData.age}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Field of Interest</label>
                <select name="field" value={formData.field} onChange={handleChange}>
                  <option value="Fresher">Fresher</option>
                  <option value="Recruiter">Recruiter</option>
                </select>
              </div>

              {/* Resume Upload for Freshers */}
              {formData.field === "Fresher" && (
                <div className="form-group">
                  <label>Submit Your Resume</label>
                  <input
                    type="file"
                    name="resume"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    required={formData.field === "Fresher"}
                  />
                </div>
              )}
            </>
          )}

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="submit-button">
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="toggle-link">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>

        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default Login;