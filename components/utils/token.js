const TOKEN = "token";
export function saveTokens(tokens) {
  localStorage.setItem(TOKEN, JSON.stringify(tokens));
}

export function getTokens() {
  return JSON.parse(localStorage.getItem(TOKEN));
}

export function deleteTokens() {
  localStorage.removeItem(TOKEN);
}
