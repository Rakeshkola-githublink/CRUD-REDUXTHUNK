import './CustomModal.css'
import { useSelector } from 'react-redux'
const CustomModal = ({id, showPopUp ,setShowPopUp}) => {
  const allUsers =  useSelector((state)=> state.app.users)
  const singleUser = allUsers.filter((ele)=> ele.id === id)
  return (
    <div className='modalBackground'>
        <div className="modalContainer">
            <button onClick={()=> setShowPopUp(false)}>X</button>
            <h2>{singleUser[0].name}</h2>
            <h3>{singleUser[0].email}</h3>
            <h4>{singleUser[0].age}</h4>
            <h5>{singleUser[0].gender}</h5>
        </div>
        
    </div>
  )
}

export default CustomModal