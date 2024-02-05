import api from "@/services/api";

export default {
    // Método para agregar comentario
    comment(body) {
      return api().post('/comments', body);
    },
  };