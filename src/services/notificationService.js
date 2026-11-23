import messaging from '../firebase/firebase.js';

async function sendToUser(tokens, { title, body, data = {} }) {
    // let token = tokens[0];
    // await messaging.send({ token, notification: { title, body } });
//   const { rows } = await pool.query(
//     'SELECT token FROM device_tokens WHERE user_id = $1',
//     [userId]
//   );
//   const tokens = rows.map((r) => r.token);
//   if (tokens.length === 0) return;

  const response = await messaging.sendEachForMulticast({
    tokens,
    notification: { title, body },
    data, // all values must be strings
    android: { priority: 'high', notification: { channelId: 'habit_reminders' } },
    apns: { payload: { aps: { sound: 'default' } } },
  });

  // Clean up invalid/expired tokens
  const stale = [];
  response.responses.forEach((r, i) => {
    const code = r.error?.code;
    if (
      code === 'messaging/registration-token-not-registered' ||
      code === 'messaging/invalid-registration-token'
    ) {
      stale.push(tokens[i]);
    }
  });
  if (stale.length) {
    await pool.query('DELETE FROM device_tokens WHERE token = ANY($1)', [stale]);
  }
}

export default sendToUser;