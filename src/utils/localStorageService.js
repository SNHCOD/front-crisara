// localStorageService.js
const STORAGE_KEY = 'my_app_storage';

export default {
  saveState(state) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  },
  getState() {
    const savedState = localStorage.getItem(STORAGE_KEY);
    return savedState ? JSON.parse(savedState) : null;
  },
  clearState() {
    localStorage.removeItem(STORAGE_KEY);
  },
};
