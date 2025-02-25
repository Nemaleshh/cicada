import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/nav"

import JobPage from "./pages/job"

import Login from "./pages/login"
import SignUp from "./pages/signup"
import Dashboard from "./pages/dashboard"
import Learning from "./pages/learning"



function App() {
 return(
  <BrowserRouter>
  <Routes>

  <Route path="/" element ={<><Login/></>}/>
  <Route path="/signup" element ={<><SignUp/></>}/>
  <Route path="/Dashboard" element ={<><Dashboard/></>}/>
  <Route path="/home" element={<><Navbar/><JobPage/></>}/>
  <Route path="/learning" element={<><Navbar/><Learning/></>}/>
  <Route path="/navbar" element={<Navbar/>}/>
  </Routes>
  

  </BrowserRouter>
 )
  
}

export default App