// cartStore.js
import { defineStore } from 'pinia';

export const useSessionStore = defineStore('session', {
  state: () => ({
    session: null,
  }),
  actions: {
    login(session) {
      this.session = session;
      this.saveSession();
    },
    clearSession() {
      this.session = null;
      this.saveSession();
    },
    saveSession() {
      localStorage.setItem('session', JSON.stringify(this.session));
    },
    loadSession() {
      const savedSession = localStorage.getItem('session');
      this.session = savedSession? JSON.parse(savedSession) : null;
    },
    getSession() {
      this.loadSession();
      return this.session;
    },
    logged() {
      this.loadSession();
      return (this.session != null);
    },
    getUserdata() {
      this.loadSession();
      return this.session.customer;
    },
  },
});
