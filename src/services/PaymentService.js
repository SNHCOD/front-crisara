import api from "@/services/api";

export default {
    pay(params) {
        return api().post('/conekta/pay', params)
    },
    save(params) {
        return api().post('/save', params)
    },
}