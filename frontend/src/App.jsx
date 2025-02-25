import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/nav";
import JobPage from "./pages/userjob";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import Dashboard from "./pages/dashboard";
import Learning from "./pages/learning";
import Jobs from "./pages/userjob";
import UserJobs from "./pages/userjob";
import RecruiterJobs from "./pages/rec";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<><Login /></>} />
        {/* <Route path="/signup" element={<><SignUp /></>} /> */}
        <Route path="/Dashboard" element={<><Dashboard /></>} />
        <Route path="/job" element={<><Jobs /></>} />
        <Route path="/learning" element={<><Navbar /><Learning /></>} />
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/userjob" element={<UserJobs />} />
        <Route path="/recjob" element={<RecruiterJobs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;