const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

// Initialize Firebase Admin SDK with your service account credentials
const serviceAccount = require('./path/to/serviceAccountKey.json'); // Update with your service account key
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
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
