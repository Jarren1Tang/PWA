import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Re.css';
import email_icon from './Assets/email.png';
import password_icon from './Assets/password.png';

const ResetPassword = () => {
  const [resetData, setResetData] = useState({
    email: '',
    password: ''
  });

  const handleReset = () => {
    // Reset password logic goes here
    console.log('Reset password:', resetData);
    // Redirect to login page after password reset
    window.location.href = "/";
  };

  return (
    <div className='container'>
      <div className='header'>
        <div className='text'>Reset Password</div>
        <div className='underline'></div>
      </div>
      <div className='inputs'>
        <div className='input'>
          <img src={email_icon} alt='' />
          <input
            type='email'
            placeholder='Email'
            name='email'
            value={resetData.email}
            onChange={(e) => setResetData({ ...resetData, email: e.target.value })}
          />
        </div>
        <div className='input'>
          <img src={password_icon} alt='' />
          <input
            type='password'
            placeholder='New Password'
            name='password'
            value={resetData.password}
            onChange={(e) => setResetData({ ...resetData, password: e.target.value })}
          />
        </div>
      </div>
      <div className='submit-container'>
        <div className='submit' onClick={handleReset}>
          Reset Password
        </div>
      </div>
      <div className='back-to-login'>
        <Link to="/"><span style={{ color: 'blue' }}>Back to Login</span></Link>
      </div>
    </div>
  );
};

export default ResetPassword;