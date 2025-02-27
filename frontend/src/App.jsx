import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";

import "./index.css";
import LearningResources from "./pages/learn_path";
import Dashboard from "./pages/dashborad";
import Pitch from "./pages/pitch"
import JobOpportunities from"./pages/job"
import FresherPage from "./pages/fresh_job";
import RecruiterPage from "./pages/recruiterpage"
import Navbar from "./components/nav";
import Get from "./pages/get";
import ExpertDiaries from "./pages/expert";


function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/login" element={<><Login /></>} />
      <Route path="/dashboard" element={<><Navbar/><Dashboard/></>} />
      <Route path="/learn" element={<><Navbar/><LearningResources /></>} />
      <Route path="/pitch" element={<><Navbar/><Pitch /></>} />
      <Route path="/fresh" element={<><Navbar/><FresherPage /></>} />
      <Route path="/rec" element={<><Navbar/><RecruiterPage /></>} />
      <Route path="/nav" element={<><Navbar /></>} />
      <Route path="/" element={<><Get /></>} />
      <Route path="/expert" element={<><Navbar/><ExpertDiaries /></>} />
   



    
      </Routes>
    </BrowserRouter>
  );
}

export default App;