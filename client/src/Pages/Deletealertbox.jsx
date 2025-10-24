import {React,useState} from 'react';
import { FaTrash } from 'react-icons/fa6';
import './Deletealertbox.css'

export const Deletealertbox = ({aa,...props}) => {
    const [showAlert, setShowAlert] = useState(false);
    const [yes_no,setYes_no]=useState(null);

   

    const toggleDelete = () => {
        setShowAlert(!showAlert);
      }

    const handleDeleteClick = () => {
        setShowAlert(true);
        document.body.style.overflow = 'hidden';
      };
     
    const handleCancelDelete = () => {
        setShowAlert(false);
        document.body.style.overflow = 'auto';
    };

    const handleConfirmDelete = () => {
        setYes_no("yes");  
        props?.senddd("yes");
        handleCancelDelete();
    };

  return (
    <div>
        <button style={{"backgroundColor":"white"}}  className='delete-icon-button'><FaTrash className='delete-icon' onClick={()=>{toggleDelete();handleDeleteClick();}}
      style={{
        color: showAlert ? 'rgb(239, 67, 63)' : 'rgb(179,179,179)',  
      }}/> 
        </button> 

      {showAlert && (
        <div className='overlay'>
          <div className="alert-box">
            <div className='alert-box-top'>
              <button className='alert-box-close-button' onClick={handleCancelDelete} type='button'>
                &times;
              </button>
            </div>
            <div className='alert-box-container'>
              <h3>Are you sure you want to delete this reply/post ?</h3>
            </div>
            <div className='alert-box-footer'>
              <button onClick={handleConfirmDelete} type='submit'>Yes</button>
              <button onClick={handleCancelDelete} type='button'>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}