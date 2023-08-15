import React from 'react'
import "./Footer.css"
import {Link} from 'react-router-dom';
import { FaFacebookF } from "react-icons/fa";
import { BsTwitter } from "react-icons/bs";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";

const footer = () => {
  return (
    <footer className='footer_details'>
      <div className="footer_container">
      <div className='footer_row'>
      <div className="footer_col">
        <h4>About</h4>
          <ul>
             <Link><li>About Us</li></Link>
             <Link><li>Our Services</li></Link>
             <Link><li>Blog</li></Link>
             <Link><li>Privacy Policy</li></Link>
          </ul>
      </div>
      <div className="footer_col">
        <h4>Community</h4>
          <ul>
             <Link><li>Help Center</li></Link>
             <Link><li>Sign in</li></Link>
             <Link><li>Sign up</li></Link>
          </ul>
      </div>
      <div className="footer_col">
        <h4>Businesses</h4>
          <ul>
             <Link><li>Review Hunt Business</li></Link>
             <Link><li>Blog for Business</li></Link>
          </ul>
      </div>
      <div className="footer_col">
        <h4>Follow Us</h4>
          <div className='social_media_link'>
                <Link><li className='social_media_icon'><FaFacebookF/></li></Link>
                <Link><li className='social_media_icon'><BsTwitter/></li></Link>
                <Link><li className='social_media_icon'><FaInstagram/></li></Link>
                <Link><li className='social_media_icon'><FaLinkedinIn/></li></Link>
          </div>
      </div>
      </div>
      <br></br><br></br><br></br>
      <div className='footer'>
         <p>© {new Date().getFullYear()} Customer Review Platform.  All Rights Reserved.</p>
      </div>
    </div>
    </footer>
  )
}

export default footer
