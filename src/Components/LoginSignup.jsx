import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LS.css';
import user_icon from './Assets/user.png';
import email_icon from './Assets/email.png';
import password_icon from './Assets/password.png';

export const LoginSignup = () => {
  const [action, setAction] = useState('Login');
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [loginError, setLoginError] = useState(null);

  const handleSignupContinue = async () => {
    // Check if any of the required fields are empty
    if (!signupData.name || !signupData.email) {
      alert('Please fill out all required fields.'); // Display an alert message
      return; // Exit the function if any required field is empty
    }

    try {
      const response = await fetch('http://localhost:3002/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupData),
      });
      const data = await response.json();
      console.log(data);
      alert('User registered successfully');
      setSignupData({ name: '', email: '', password: '' });
      setAction('Login');
    } catch (error) {
      console.error('Error registering user:', error);
      alert('Error registering user. Please try again.');
    }
  };

  const handleLoginContinue = async () => {
    try {
      const response = await fetch('http://localhost:3002/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });
      const data = await response.json();
      console.log(data);

      // Check for successful login response (modify based on your backend logic)
      if (data.success || data.message === 'Login successful') { // Adjust based on your response
        alert('Login successful');
        window.location.href = "/dashboard"; // Redirect to dashboard page
      } else {
        setLoginError('Incorrect email or password. Please try again.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setLoginError('Incorrect email or password. Please try again.');
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        {action === 'Login' ? null : (
          <div className="input">
            <img src={user_icon} alt="" />
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={signupData.name}
              onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
            />
          </div>
        )}

        <div className="input">
          <img src={email_icon} alt="" />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={action === 'Login' ? loginData.email : signupData.email}
            onChange={(e) =>
              action === 'Login'
                ? setLoginData({ ...loginData, email: e.target.value })
                : setSignupData({ ...signupData, email: e.target.value })
            }
          />
        </div>
        <div className="input">
          <img src={password_icon} alt="" />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={action === 'Login' ? loginData.password : signupData.password}
            onChange={(e) =>
              action === 'Login'
                ? setLoginData({ ...loginData, password: e.target.value })
                : setSignupData({ ...signupData, password: e.target.value })
            }
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                action === 'Login' ? handleLoginContinue() : handleSignupContinue();
              }
            }}
          />
        </div>
      </div>
      {action === 'Login' ? (
        <div className="forgot-password">
          Lost Password?{' '}
          <Link to="/reset-password">
            <span style={{ color: 'blue' }}>Click Here!</span>
          </Link>
        </div>
      ) : null}
      {action === 'Login' && loginError && <p className="error">{loginError}</p>}
      <div className="submit-container">
        <div
          className={action === 'Login' ? 'submit gray' : 'submit'}
          onClick={() => {
            setAction('Sign Up');
          }}
        >
          Sign Up
        </div>
        <div
          className={action === 'Sign Up' ? 'submit gray' : 'submit'}
          onClick={() => {
            setAction('Login');
          }}
        >
          Login
        </div>
      </div>
      <div className="continue-container">
        <div
          className="continue"
          onClick={action === 'Sign Up' ? handleSignupContinue : handleLoginContinue}
        >
          Continue
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;