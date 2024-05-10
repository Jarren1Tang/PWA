const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

// Initialize Firebase Admin SDK with your service account credentials
const serviceAccount = require('./path/to/serviceAccountKey.json'); // Update with your service account key
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  apiKey: "AIzaSyAGnhEObuNYweqm6Ab01PdIJ1__dA1dtpE",  
  authDomain: "pwa-fyp-8038d.firebaseapp.com",
  projectId: "pwa-fyp-8038d",
  storageBucket: "pwa-fyp-8038d.appspot.com",
  messagingSenderId: "177810861430",
  appId: "1:177810861430:web:146c048b8325ce4efcde57",
  measurementId: "G-W1JC46F0DQ"
});

// Endpoint to send push notification
router.post('/send-notification', async (req, res) => {
  const { token, title, body } = req.body;

  if (!token || !title || !body) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Send push notification
    await admin.messaging().send({
      token: token,
      notification: {
        title: title,
        body: body
      }
    });

    return res.status(200).json({ message: 'Push notification sent successfully' });
  } catch (error) {
    console.error('Error sending push notification:', error);
    return res.status(500).json({ error: 'Failed to send push notification' });
  }
});

module.exports = router;
