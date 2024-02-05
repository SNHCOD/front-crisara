// cartStore.js
import { defineStore } from 'pinia';

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    settings: null,
  }),
  actions: {
    addSettings(settings) {
      this.settings = settings;
      this.saveSettings();
    },
    clearSettings() {
      this.settings = null;
      this.saveSettings();
    },
    saveSettings() {
      localStorage.setItem('settings', JSON.stringify(this.settings));
    },
    loadSettings() {
      const savedSettings = localStorage.getItem('settings');
      this.settings = savedSettings? JSON.parse(savedSettings) : null;
    },
    getSettings() {
      this.loadSettings();
      return this.settings;
    },
    getCategories() {
      this.loadSettings();
      return this.settings.categories;
    },
    getCarousel() {
      this.loadSettings();
      return this.settings.settings.Carousel;
    },
    getBuyadvantage() {
      this.loadSettings();
      return this.settings.settings.Buyadvantage;
    },
    getCBPaqueterias() {
      this.loadSettings();
      return this.settings.settings.CBPaqueterias;
    },
  }
});
