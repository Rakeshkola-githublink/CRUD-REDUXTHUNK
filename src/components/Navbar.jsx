import { useState,useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { searchUser } from "../app/features/userDetailsSlice"
const Navbar = () => {
  const allUsers = useSelector((state)=> state.app.users)
  const dispatch = useDispatch()
  const [searchData, setSearchdata]= useState()
  
    // Fetch users when the component mounts
    useEffect(() => {
      dispatch(searchUser(searchData));
    }, [searchData]);
  return (
    <div>

<nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">RTK</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
                <li className="nav-item ">
                  <Link to="/" className="p-2">Create Post</Link>
                </li>
                <li className="nav-item ">
                  <Link to="/read" className="pr-2"> All Post ({allUsers.length})</Link>
                </li>
               </ul>
              <form className="d-flex" role="search">
                <input className="form-control  " type="search" placeholder="Search" aria-label="Search"  onClick={(e)=>(setSearchdata(e.target.value))} />
                
              </form>
            </div>
          </div>
        </nav>
  
    </div>
  )
}

export default Navbar