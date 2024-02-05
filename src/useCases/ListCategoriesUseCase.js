// src/useCases/ListCategoriesUseCase.js
import categoryApi from '@/api/categoryApi';

export default {
  execute() {
    return categoryApi.getAllCategories();
  },
};
