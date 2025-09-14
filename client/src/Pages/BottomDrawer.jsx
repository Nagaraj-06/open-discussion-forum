import React, { useState } from 'react';
import './Bottomdrawer.css'; 
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';

function BottomDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState(null);
  const openDrawer = () => setIsOpen(true);
  const closeDrawer = () => setIsOpen(false);
  return (
    <>
      <button className="open-btn" onClick={openDrawer}>
        Reply
      </button>

      <div className={`drawer ${isOpen ? 'open' : ''}`}>
        <div className="drawer-content">
          <button className="close-btn" onClick={closeDrawer}>
            &times;
          </button>
          <h2>Reply to Finding the Second Largest Element in array</h2>
          <div className='drawer-body'>
          <button
            onClick={() => document.getElementById('file-upload').click()}
            className="bottomupload-file">
            <DriveFolderUploadIcon />
            Upload File
           </button>
          <input 
            type="file" 
            id="file-upload"
            className="file-upload"
            accept='.jpg,.jpeg,.png' 
            onChange={(e) => {
            setFile(e.target.files[0]);}}
          />
          {file && <p>Selected file: {file.name}</p>}
      
          <textarea type="text" placeholder="Type here..." className="input-field" required/>
          </div>
          
          <div className="drawer-footer">
            <button className="cancel-btn" onClick={closeDrawer}>
              Cancel
            </button>
            <button className="save-btn">Save</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default BottomDrawer;