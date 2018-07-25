/* App constants */

export const APP_ID                = ""; // Project ID
export const GOOGLE_PROJECT_NUMBER = ""; // Project number
export const GOOGLE_API_KEY        = ""; // Google API key
export const NEWS_ON               = "enabled";
export const NEWS_OFF              = "disabled";
export const MAX_NEWS_NUMBER       = 20;
export const USE_PROXY             = false;
export const URL_BASE              = USE_PROXY ? "api" : ""; // Fill the empty string with your server path
export const X_AUTH                = "X-Auth";
export const AUTH_TOKEN            = "auth-token";
export const UTENTE_STORAGE        = "utente";
export const ACCOUNT_STORAGE       = "account";
export const UNAUTHORIZED_ERROR    = 401;
export const FORBIDDEN_ERROR       = 403; 

export const URL = {
  LOGIN: URL_BASE + "/login",
  LOGOUT: URL_BASE + "/logout",
  UPDATE_PROFILO: URL_BASE + "/utente/updateprofilo",
  NOTIZIE: URL_BASE + "/notizie",
  INSEGNAMENTI: URL_BASE + "/insegnamenti",
  APPELLI: URL_BASE + "/appelli",
  TASSE: URL_BASE + "/tasse",
  ESAMI: URL_BASE + "/esami",
  PRENOTAZIONE_APPELLO: URL_BASE + "/prenotazioneappello"
};