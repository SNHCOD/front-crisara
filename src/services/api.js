import axios from "axios";

export default() => {
    return axios.create({
        baseURL: import.meta.env.VITE_API_URL + '/api', // ajusta la URL según tu configuración
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': '69420',
        },
    })
}