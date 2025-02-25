import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/nav"
import GetStart from "./pages/layout"
import JobPage from "./pages/job"
import Contact from "./pages/contact"
import Login from "./pages/login"
import SignUp from "./pages/signup"
import Dashboard from "./pages/dashboard"


function App() {
 return(
  <BrowserRouter>
  <Routes>
  <Route path="/" element ={<><GetStart/></>}/>
  <Route path="/login" element ={<><Login/></>}/>
  <Route path="/signup" element ={<><SignUp/></>}/>
  <Route path="/Dashboard" element ={<><Dashboard/></>}/>

  <Route path="/home" element={<><Navbar/><JobPage/></>}/>
  <Route path="/navbar" element={<Navbar/>}/>
  </Routes>
  

  </BrowserRouter>
 )
  
}

export default App
