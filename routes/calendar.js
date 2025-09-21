const express = require('express');
const router = express.Router();
const { google } = require('googleapis');
const User = require('../models/User');

// Initialize Google Calendar API
const calendar = google.calendar('v3');

// Get user's calendar events
router.get('/events/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user || !user.googleCalendar?.accessToken) {
      return res.status(404).json({ message: 'Google Calendar not connected' });
    }

    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );

    oauth2Client.setCredentials({
      access_token: user.googleCalendar.accessToken,
      refresh_token: user.googleCalendar.refreshToken
    });

    const response = await calendar.events.list({
      auth: oauth2Client,
      calendarId: user.googleCalendar.calendarId || 'primary',
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime'
    });

    const events = response.data.items || [];
    res.json({ events });
  } catch (error) {
    console.error('Calendar error:', error);
    res.status(500).json({ message: 'Error fetching calendar events', error: error.message });
  }
});

// Create learning event
router.post('/events/:userId', async (req, res) => {
  try {
    const { title, description, startTime, endTime, location } = req.body;
    const user = await User.findById(req.params.userId);
    
    if (!user || !user.googleCalendar?.accessToken) {
      return res.status(404).json({ message: 'Google Calendar not connected' });
    }

    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );

    oauth2Client.setCredentials({
      access_token: user.googleCalendar.accessToken,
      refresh_token: user.googleCalendar.refreshToken
    });

    const event = {
      summary: title,
      description: description,
      start: {
        dateTime: startTime,
        timeZone: 'Asia/Kolkata'
      },
      end: {
        dateTime: endTime,
        timeZone: 'Asia/Kolkata'
      },
      location: location,
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 },
          { method: 'popup', minutes: 10 }
        ]
      }
    };

    const response = await calendar.events.insert({
      auth: oauth2Client,
      calendarId: user.googleCalendar.calendarId || 'primary',
      resource: event
    });

    res.json({ 
      message: 'Event created successfully', 
      event: response.data 
    });
  } catch (error) {
    console.error('Calendar creation error:', error);
    res.status(500).json({ message: 'Error creating calendar event', error: error.message });
  }
});

// Create learning schedule
router.post('/schedule/:userId', async (req, res) => {
  try {
    const { roadmapId, schedule } = req.body;
    const user = await User.findById(req.params.userId);
    
    if (!user || !user.googleCalendar?.accessToken) {
      return res.status(404).json({ message: 'Google Calendar not connected' });
    }

    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );

    oauth2Client.setCredentials({
      access_token: user.googleCalendar.accessToken,
      refresh_token: user.googleCalendar.refreshToken
    });

    const events = [];
    
    // Create events for each scheduled session
    for (const session of schedule) {
      const event = {
        summary: session.title,
        description: session.description,
        start: {
          dateTime: session.startTime,
          timeZone: 'Asia/Kolkata'
        },
        end: {
          dateTime: session.endTime,
          timeZone: 'Asia/Kolkata'
        },
        location: session.location || 'Online',
        reminders: {
          useDefault: false,
          overrides: [
            { method: 'email', minutes: 24 * 60 },
            { method: 'popup', minutes: 10 }
          ]
        }
      };

      const response = await calendar.events.insert({
        auth: oauth2Client,
        calendarId: user.googleCalendar.calendarId || 'primary',
        resource: event
      });

      events.push(response.data);
    }

    res.json({ 
      message: 'Learning schedule created successfully', 
      events 
    });
  } catch (error) {
    console.error('Schedule creation error:', error);
    res.status(500).json({ message: 'Error creating learning schedule', error: error.message });
  }
});

// Get Google OAuth URL
router.get('/auth-url', (req, res) => {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );

  const scopes = [
    'https://www.googleapis.com/auth/calendar',
    'https://www.googleapis.com/auth/tasks'
  ];

  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
    prompt: 'consent'
  });

  res.json({ authUrl });
});

// Handle Google OAuth callback
router.post('/auth-callback', async (req, res) => {
  try {
    const { code, userId } = req.body;
    
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );

    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // Get user info
    const oauth2 = google.oauth2({ version: 'v2', auth: oauth2Client });
    const userInfo = await oauth2.userinfo.get();

    // Update user with Google Calendar info
    await User.findByIdAndUpdate(userId, {
      googleCalendar: {
        calendarId: userInfo.data.id,
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token
      }
    });

    res.json({ 
      message: 'Google Calendar connected successfully',
      calendarId: userInfo.data.id
    });
  } catch (error) {
    console.error('OAuth callback error:', error);
    res.status(500).json({ message: 'Error connecting Google Calendar', error: error.message });
  }
});

module.exports = router;
