export function getUserFromStorage() {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
}
  
export function saveUserToStorage(user) {
    localStorage.setItem('user', JSON.stringify(user));
}
  
export function removeUserFromStorage() {
    localStorage.removeItem('user');
}
  