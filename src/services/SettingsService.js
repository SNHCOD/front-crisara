import api from "@/services/api";

export default {
    getSettings() {
        return api().get('/settings')
    }
}