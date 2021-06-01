const USER_ID = 'USER_ID';
const TOKEN_KEY = 'AUTH_TOKEN';

export function saveToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function getToken() {
  return JSON.parse(TOKEN_KEY);
}

export function deleteToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export function saveUserId(token: string) {
  localStorage.setItem(USER_ID, token);
}

export function getUserId() {
  return JSON.parse(USER_ID);
}

export function deleteUserId() {
  localStorage.removeItem(USER_ID);
}
