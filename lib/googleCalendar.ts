import { google } from 'googleapis';

const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;

if (!clientId || !clientSecret || !refreshToken) {
  throw new Error('Faltan las credenciales de autenticación de Google Calendar en las variables de entorno del servidor.');
}

const oauth2Client = new google.auth.OAuth2(
  clientId,
  clientSecret,
  'https://developers.google.com/oauthplayground'
);

oauth2Client.setCredentials({
  refresh_token: refreshToken,
});

export const calendar = google.calendar({
  version: 'v3',
  auth: oauth2Client,
});