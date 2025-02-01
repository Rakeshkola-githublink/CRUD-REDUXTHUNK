import { useState } from "react";
import { useDispatch } from "react-redux";
import { createUser } from "../app/features/userDetailsSlice";
import { ToastContainer,toast } from "react-toastify";
const Create = () => {
  // Initialize state with default values for each form field
  const [user, setUser] = useState({
    name: "",
    email: "",
    age: "",
    gender: "", // Add gender state
  });

  const dispatch = useDispatch();

  // Handle input changes and update state accordingly
  const getUsersDetails = (e) => {
    const { name, value, type, checked } = e.target;
    // If the input type is radio, handle gender selection
    if (type === "radio") {
      setUser({
        ...user,
        gender: checked ? value : user.gender, // Only update gender if selected
      });
    } else {
      setUser({
        ...user,
        [name]: value, // For text inputs
      });
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the form from refreshing
    console.log(user); // Log the form data to check if it's correct
    dispatch(createUser(user)); 
    toast.success("User Registration Done Successfully")
  };

  return (
    <div>
      <h2>Fill the data</h2>
      <form className="w-50 mx-auto" onSubmit={handleSubmit}>
        {/* Name Field */}
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="name w-100"
            name="name"
            value={user.name} // Bind input value to state
            onChange={getUsersDetails}
          />
        </div>

        {/* Email Field */}
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="email w-100"
            name="email"
            value={user.email} // Bind input value to state
            onChange={getUsersDetails}
          />
        </div>

        {/* Age Field */}
        <div className="mb-3">
          <label className="form-label">Age</label>
          <input
            type="text"
            className="age w-100"
            name="age"
            value={user.age} // Bind input value to state
            onChange={getUsersDetails}
          />
        </div>

        {/* Gender Field */}
        <div className="mb-3">
          <label className="form-label">Gender</label>
          <div>
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              id="male"
              value="Male"
              checked={user.gender === "Male"} // Checked if the gender is Male
              onChange={getUsersDetails}
            />
            <label className="form-check-label">Male</label>
          </div>

          <div>
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              id="female"
              value="Female"
              checked={user.gender === "Female"} // Checked if the gender is Female
              onChange={getUsersDetails}
            />
            <label className="form-check-label">Female</label>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-3">
          <button className="btn btn-primary">Submit</button>
        </div>
      </form>
      <ToastContainer/>
    </div>
  );
};

export default Create;
