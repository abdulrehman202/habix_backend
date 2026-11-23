import express from 'express';
import db from '../db/database.js';
import sendToUser from '../services/notificationService.js';

const router = express.Router();

router.post('/devices', async (req, res) => {
  const { token, platform } = req.body;
  if (!token) return res.status(400).json({ error: 'token required' });
  
  sendToUser([token], {
  title: 'Test',
  body: 'Hello from Node',
  data: { habitId: '123' },
});

//   await pool.query(
//     `INSERT INTO device_tokens (user_id, token, platform)
//      VALUES ($1, $2, $3)
//      ON CONFLICT (token) DO UPDATE SET user_id = EXCLUDED.user_id, platform = EXCLUDED.platform`,
//     [req.user.id, token, platform]
//   );
  res.sendStatus(204);
});

router.delete('/devices', async (req, res) => {
  await pool.query('DELETE FROM device_tokens WHERE token = $1 AND user_id = $2', [
    req.body.token,
    req.user.id,
  ]);
  res.sendStatus(204);
});

export default router;