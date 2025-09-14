import React from 'react';
import './Footer.css';
import Img6 from '../assets/Bannari_Amman_logo.jpeg';
import PlaceIcon from '@mui/icons-material/Place';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';

export const Footer = () => {
  return (
      <div className='footer'>
        <div className='details'>
            <h2>COLLEGE DETAILS</h2>
              <table className='footer-table'>
                <tr>
                  <td><PlaceIcon/></td>
                  <td>  Alathukombai,Sathyamangalam
                    <br/>Erode,Tamilnadu-638401
                  </td>
                </tr>
                <tr>
                  <td><LocalPhoneIcon/></td>
                  <td>04295 226 000</td>
                </tr>
                <tr>
                  <td><EmailIcon/></td>
                  <td>stayahead@bitsathy.ac.in</td>
                </tr>
              </table>
        </div>
        <div className='copyrights'>
                <img src={Img6} alt='xyz'/>
                <br/>
              Unauthorized use, reproduction, or distribution of this<br/> 
              content is prohibited and may lead to legal action.<br/>
              &copy; 2024 Bannari Amman Institute of Technology<br/>
              All Rights reserved
        </div>
        <div className='essentials'>
              <h2>OTHER WEBSITES</h2>
              <ul>
                <li><a href="https://www.bitsathy.ac.in">Main Page</a></li>
                <li><a href="https://moodle.bitsathy.ac.in">Moodle</a></li>
                <li><a href="https://bip.bitsathy.ac.in">BIP Portal</a></li>
                <li><a href="https://camps.bitsathy.ac.in">Camps</a></li>
                <li><a href="https://wiki.bitsathy.ac.in">Wiki BIT</a></li>
              </ul>
        </div>
      </div>
  )
}


