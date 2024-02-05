<script setup>
import { onMounted } from 'vue';
import { useSettingsStore } from '@/store/services/settingsStore';
import SettingsService from '@/services/SettingsService';

// Definición de datos
const { addSettings } = useSettingsStore();

onMounted(async() => {
  const settings = await SettingsService.getSettings();
  addSettings(settings.data);
})
</script>
<template>
  <div>
    <router-view />
  </div>
</template>