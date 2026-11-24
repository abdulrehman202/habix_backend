import express from 'express';
import db from '../db/database.js';
import { sendNotificationtoSingleUser } from '../utils/send_notification.js';

const router = express.Router();

router.post('/devices', async (req, res) => {
  const { token, platform } = req.body;
  if (!token) return res.status(400).json({ error: 'token required' });

  let existingToken = db.deviceTokens.find((t) => t == token);

  if (!existingToken) {
    db.deviceTokens.push(token);
  }
  await sendNotificationtoSingleUser(token, 'Welcome to Habix', "Let's start scheduling life.");

  res.sendStatus(200);
});

router.delete('/devices', async (req, res) => {
  db.deviceTokens = db.deviceTokens.filter((t) => t != req.body.token);
  res.sendStatus(200);
});

export default router;