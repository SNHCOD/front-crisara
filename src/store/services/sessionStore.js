// cartStore.js
import { defineStore } from 'pinia';

export const useSessionStore = defineStore('session', {
  state: () => ({
    session: {},
  }),
  actions: {
    login(session) {
      this.session = session;
      this.saveSession();
    },
    clearSession() {
      this.session = {};
      this.saveSession();
    },
    saveSession() {
      localStorage.setItem('session', JSON.stringify(this.session));
    },
    loadSession() {
      const savedSession = localStorage.getItem('session');
      this.session = savedSession? JSON.parse(savedSession) : {};
    },
    getSession() {
      this.loadSession();
      return this.session;
    },
    logged() {
      this.loadSession();
      return this.session.logged;
    },
    getUserdata() {
      this.loadSession();
      return (this.session.customer ? this.session.customer : null);
    },
    getPaymentData() {
      this.loadSession();
      return ({'token': this.session.token, 'id': this.session.customer.data.user_id})
    }
  },
});
