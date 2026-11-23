
import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getMessaging } from 'firebase-admin/messaging';
import { readFileSync } from 'fs';

const serviceAccount = JSON.parse(
  readFileSync(new URL('../../serviceAccountKey.json', import.meta.url))
);

if (!getApps().length) {
  initializeApp({ credential: cert(serviceAccount) });
}

export default getMessaging();