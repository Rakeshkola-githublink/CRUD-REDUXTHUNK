import { Routes,Route } from "react-router-dom"

import Create from "../src/components/Create"
import Navbar from "../src/components/Navbar"
import Read from '../src/components/Read'
import Update from "../src/components/Update"
import './App.css'
const App = () => {
  return (
    <div>

      <>
      <Navbar/>
      <Routes>
     
      
<Route path="/" element={<Create/>}/>
<Route path="/read" element={<Read/>}/>
<Route path="/edit/:id" element={<Update/>}/>
     
      </Routes>
   
      </>
    </div>
  )
}

export default App