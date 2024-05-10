import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './LS.css';
import user_icon from './Assets/user.png';
import email_icon from './Assets/email.png';
import password_icon from './Assets/password.png';
import firebase from 'firebase/app'; // Import only the Firebase core module
import 'firebase/messaging'; // Import additional Firebase modules as needed
import 'firebase/firestore';

// Define API URL constant
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3002';

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
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const initializeFirebaseMessaging = async () => {
      try {
        const firebaseConfig = {
          apiKey: "AIzaSyAGnhEObuNYweqm6Ab01PdIJ1__dA1dtpE",
          authDomain: "pwa-fyp-8038d.firebaseapp.com",
          projectId: "pwa-fyp-8038d",
          storageBucket: "pwa-fyp-8038d.appspot.com",
          messagingSenderId: "177810861430",
          appId: "1:177810861430:web:146c048b8325ce4efcde57",
          measurementId: "G-W1JC46F0DQ"
        };

        firebase.initializeApp(firebaseConfig);
        const messaging = firebase.messaging();
        await messaging.requestPermission();
        const token = await messaging.getToken();
        console.log('FCM Token:', token);
        // Send token to backend for storage
      } catch (error) {
        console.error('Error initializing Firebase Messaging:', error);
      }
    };
    initializeFirebaseMessaging();
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Define the handleBeforeInstallPrompt function
    function handleBeforeInstallPrompt(event) {
      // Prevent the default behavior
      event.preventDefault();
      // Store the event for later use
      setDeferredPrompt(event);
    }
  }, []);

  const handleAddToHomeScreen = () => {
    // Display the browser's install prompt
    if (deferredPrompt) {
      deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
          // Call API endpoint to handle install prompt action
          fetch(`${API_URL}/handle-install-prompt`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ action: 'accepted' }),
          }).then((response) => {
            if (!response.ok) {
              console.error('Failed to handle install prompt action');
            }
          }).catch((error) => {
            console.error('Error handling install prompt action:', error);
          });
        } else {
          console.log('User dismissed the A2HS prompt');
          // Call API endpoint to handle install prompt action
          fetch(`${API_URL}/handle-install-prompt`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ action: 'dismissed' }),
          }).then((response) => {
            if (!response.ok) {
              console.error('Failed to handle install prompt action');
            }
          }).catch((error) => {
            console.error('Error handling install prompt action:', error);
          });
        }
        // Clear the deferredPrompt variable
        setDeferredPrompt(null);
      });
    }
  };

  const handleSignupContinue = async () => {
    // Check if any of the required fields are empty
    if (!signupData.name || !signupData.email) {
      alert('Please fill out all required fields.'); // Display an alert message
      return; // Exit the function if any required field is empty
    }

    try {
      const response = await fetch(`${API_URL}/register`, {
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
      const response = await fetch(`${API_URL}/login`, {
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
      <div className="download-container">
        <button onClick={handleAddToHomeScreen}>Download App</button>
      </div>
    </div>
  );
};

export default LoginSignup;
