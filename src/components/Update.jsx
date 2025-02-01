import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { updateUser } from "../app/features/userDetailsSlice";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Update = () => {
  const { id } = useParams();  // Get id from URL
  const dispatch = useDispatch();
  
  const { users } = useSelector((state) => state.app); // Access Redux state // Fetch all users from Redux state
  const [updateData, setUpdateData] = useState();  // Initialize updateData as an empty object
  const navigate = useNavigate();

  // Fetch the user data when the component mounts or when `id` changes
  useEffect(() => {
    if (id) {
      const singleUser = users.find((ele) => ele.id === id);  // Use find to get the user
      if (singleUser) {
        setUpdateData(singleUser);  // Set the user data in state
      }
    }
  }, []); 
  console.log(updateData);
   // Add `id` and `allUsers` to dependency array

  const newUpdatedData = (e) => {
    setUpdateData({ ...updateData, [e.target.name]: e.target.value });  // Update state with new values
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser(updateData));  // Dispatch update action
    navigate('/read');  // Navigate back to the "read" page after submission
  };

  // If updateData is not set, show a loading message or error message
  if (!updateData || !updateData.name) {
    return <div>Loading...</div>;  // Loading state while the data is being fetched
  }

  return (
    <div>
      <h2>Fill the Data</h2>
      <form className="w-50 mx-auto" onSubmit={handleSubmit}>
        {/* Name Field */}
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="name w-100"
            name="name"
            value={updateData.name || ''}  // Prevent undefined error
            onChange={newUpdatedData}
          />
        </div>

        {/* Email Field */}
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="email w-100"
            name="email"
            value={updateData.email || ''}  // Prevent undefined error
            onChange={newUpdatedData}
          />
        </div>

        {/* Age Field */}
        <div className="mb-3">
          <label className="form-label">Age</label>
          <input
            type="text"
            className="age w-100"
            name="age"
            value={updateData.age || ''}  // Prevent undefined error
            onChange={newUpdatedData}
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
              checked={updateData.gender === "Male"}  // Check if gender is Male
              onChange={newUpdatedData}
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
              checked={updateData.gender === "Female"}  // Check if gender is Female
              onChange={newUpdatedData}
            />
            <label className="form-check-label">Female</label>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-3">
          <button className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Update;
