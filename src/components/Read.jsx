import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, deleteUser } from "../app/features/userDetailsSlice";
import { Link } from 'react-router-dom';
import CustomModal from "./CustomModal";
import { Skeleton, Box, Card, CardContent, Typography, Button } from '@mui/material';
import { ToastContainer,toast } from "react-toastify";
const Read = () => {
  const dispatch = useDispatch();
  const { users, loading, searchData, error } = useSelector((state) => state.app); // Access Redux state
  const [id, setId] = useState();
  const [showPopUp, setShowPopUp] = useState(false);

  // Fetch users when the component mounts
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // Display loading skeleton if data is being fetched
  if (loading) {
    return (
      <div>
        <h2>Loading...</h2>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {[...Array(5)].map((_, index) => (
            <Card key={index} sx={{ display: 'flex', flexDirection: 'column', width: '50rem',marginLeft:'50px' }}>
              <CardContent>
                <Skeleton variant="text" width="80%" height={40} />
                <Skeleton variant="text" width="60%" height={30} />
                <Skeleton variant="text" width="50%" height={30} />
                <Skeleton variant="text" width="50%" height={30} />
                <Skeleton variant="rectangular" width="100%" height={50} />
              </CardContent>
            </Card>
          ))}
          <ToastContainer/>
        </Box>
      </div>
    );
  }

  // Display error message if fetch failed
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {showPopUp && <CustomModal id={id} showPopUp={showPopUp} setShowPopUp={setShowPopUp} />}
      <h2>All Data</h2>
      <div
        style={{
          maxHeight: '80vh', // Maximum height to show a certain amount of cards before scrolling
          overflowY: 'auto', // Enables vertical scrolling
          padding: '10px', // Adds padding around the scrollable container
        }}
      >
        {users &&
          users
            .filter((ele) => {
              if (!searchData || searchData.length === 0) {
                return ele;
              } else {
                return ele.name.toLowerCase().includes(searchData.toLowerCase());
              }
            })
            .map((user) => (
              <Card key={user.id} sx={{ width: '50rem', margin: '1rem auto' }}>
                <CardContent>
                  <Typography variant="h5" component="div">{user.name}</Typography>
                  <Typography variant="body2" color="text.secondary">{user.email}</Typography>
                  <Typography variant="body2" color="text.secondary">{user.age} years old</Typography>
                  <Typography variant="body2" color="text.secondary">{user.gender}</Typography>
                  <div>
                    <Button
                      variant="outlined"
                      sx={{ marginRight: '8px' }}
                      onClick={() => {
                        setId(user.id);
                        setShowPopUp(true);
                      }}
                    >
                      View
                    </Button>
                    <Link to={`/edit/${user.id}`} style={{ textDecoration: 'none' }}>
                      <Button variant="outlined" sx={{ marginRight: '8px' }}>
                        Edit
                      </Button>
                    </Link>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => dispatch(deleteUser(user.id),toast.success("User Deleted Successfully"))}
                    >
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
      </div>
    </div>
  );
};

export default Read;
