  // src/useCases/ListCategoriesUseCase.js
  import productApi from '@/api/productsApi';

  export default {
    execute(page) {
      return productApi.getProducts(page);
    },
    executeByCategory(id) {
      return productApi.getProductsByCategory(id);
    },
    executeById(id) {
      return productApi.getProductsById(id);
    },
    executeBestSeller() {
      return productApi.getBestSeller();
    },
    executeNewer() {
      return productApi.getNewer();
    },
    executePreview() {
      return productApi.getPreview();
    },
    executeByParam(page, param) {
      return productApi.getProductsByParam(page, param);
    },
    executeByRelated(id) {
      return productApi.getRelated(id);
    },
  };
/*
// src/useCases/ListCategoriesUseCase.js
import { configureStore } from '@reduxjs/toolkit';
import { computed, onUnmounted, ref, onMounted, watch } from 'vue'
import { productApi } from '@/api/productsApi';

const reduxStore = configureStore({
    reducer: {
      [productApi.reducerPath]: productApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(productApi.middleware),
})

export default {
  execute(param) {
    const store = ref(reduxStore.getState());
    const refetch = ref(() => {});
    const unsubscribe = ref(() => {});

    const unsubscribeStore = reduxStore.subscribe(() => {
        store.value = reduxStore.getState();
    });

    const getProducts = () => {
        const result = reduxStore.dispatch(productApi.endpoints.getProducts.initiate(param));
        refetch.value = result.refetch;
        unsubscribe.value  = result.unsubscribe;
    }

    const result = computed(() => productApi.endpoints.getProducts.select(param)(store.value));
  
    const isLoading = computed(() => result.value.isLoading);
    const isFetching = computed(() => result.value.isFetching);
    const error = computed(() => result.value.isError);
    const data = computed(() => result.value.data);

    onMounted(getProducts);
    watch(param, getProducts);

    onUnmounted(() => {
        unsubscribeStore();
        unsubscribe.value();
    });

    return {
        data,
        refetch,
        isLoading,
        isFetching,
        error
    }
  },
  executeByCategory(param) {
    const store = ref(reduxStore.getState());
    const refetch = ref(() => {});
    const unsubscribe = ref(() => {});

    const unsubscribeStore = reduxStore.subscribe(() => {
        store.value = reduxStore.getState();
    });

    const getProducts = () => {
        const result = reduxStore.dispatch(productApi.endpoints.getProductsByCategory.initiate(param));
        refetch.value = result.refetch;
        unsubscribe.value  = result.unsubscribe;
    }

    const result = computed(() => productApi.endpoints.getProductsByCategory.select(param)(store.value));
  
    const isLoading = computed(() => result.value.isLoading);
    const isFetching = computed(() => result.value.isFetching);
    const error = computed(() => result.value.isError);
    const data = computed(() => result.value.data);

    onMounted(getProducts);
    watch(param, getProducts);

    onUnmounted(() => {
        unsubscribeStore();
        unsubscribe.value();
    });

    return {
        data,
        refetch,
        isLoading,
        isFetching,
        error
    }
  },
  executeByParam(page, param) {
    const store = ref(reduxStore.getState());
    const refetch = ref(() => {});
    const unsubscribe = ref(() => {});

    const unsubscribeStore = reduxStore.subscribe(() => {
        store.value = reduxStore.getState();
    });

    const getProducts = () => {
        const result = reduxStore.dispatch(productApi.endpoints.getProductsByParam.initiate(page, param));
        refetch.value = result.refetch;
        unsubscribe.value  = result.unsubscribe;
    }

    const result = computed(() => productApi.endpoints.getProductsByParam.select(page, param)(store.value));
  
    const isLoading = computed(() => result.value.isLoading);
    const isFetching = computed(() => result.value.isFetching);
    const error = computed(() => result.value.isError);
    const data = computed(() => result.value.data);

    onMounted(getProducts);
    watch([page, param], getProducts);

    onUnmounted(() => {
        unsubscribeStore();
        unsubscribe.value();
    });

    return {
        data,
        refetch,
        isLoading,
        isFetching,
        error
    }
  },
  executeBestSeller() {
    const store = ref(reduxStore.getState());
    const refetch = ref(() => {});
    const unsubscribe = ref(() => {});

    const unsubscribeStore = reduxStore.subscribe(() => {
        store.value = reduxStore.getState();
    });

    const getProducts = () => {
        const result = reduxStore.dispatch(productApi.endpoints.getBestSeller.initiate());
        refetch.value = result.refetch;
        unsubscribe.value  = result.unsubscribe;
    }

    const result = computed(() => productApi.endpoints.getBestSeller.select()(store.value));
  
    const isLoading = computed(() => result.value.isLoading);
    const isFetching = computed(() => result.value.isFetching);
    const error = computed(() => result.value.isError);
    const data = computed(() => result.value.data);

    onMounted(getProducts);

    onUnmounted(() => {
        unsubscribeStore();
        unsubscribe.value();
    });

    return {
        data,
        refetch,
        isLoading,
        isFetching,
        error
    }
  },
  executeNewer() {
    const store = ref(reduxStore.getState());
    const refetch = ref(() => {});
    const unsubscribe = ref(() => {});

    const unsubscribeStore = reduxStore.subscribe(() => {
        store.value = reduxStore.getState();
    });

    const getProducts = () => {
        const result = reduxStore.dispatch(productApi.endpoints.getNewer.initiate());
        refetch.value = result.refetch;
        unsubscribe.value  = result.unsubscribe;
    }

    const result = computed(() => productApi.endpoints.getNewer.select()(store.value));
  
    const isLoading = computed(() => result.value.isLoading);
    const isFetching = computed(() => result.value.isFetching);
    const error = computed(() => result.value.isError);
    const data = computed(() => result.value.data);

    onMounted(getProducts);

    onUnmounted(() => {
        unsubscribeStore();
        unsubscribe.value();
    });

    return {
        data,
        refetch,
        isLoading,
        isFetching,
        error
    }
  },
  executePreview() {
    const store = ref(reduxStore.getState());
    const refetch = ref(() => {});
    const unsubscribe = ref(() => {});

    const unsubscribeStore = reduxStore.subscribe(() => {
        store.value = reduxStore.getState();
    });

    const getProducts = () => {
        const result = reduxStore.dispatch(productApi.endpoints.getPreview.initiate());
        refetch.value = result.refetch;
        unsubscribe.value  = result.unsubscribe;
    }

    const result = computed(() => productApi.endpoints.getPreview.select()(store.value));
  
    const isLoading = computed(() => result.value.isLoading);
    const isFetching = computed(() => result.value.isFetching);
    const error = computed(() => result.value.isError);
    const data = computed(() => result.value.data);

    onMounted(getProducts);

    onUnmounted(() => {
        unsubscribeStore();
        unsubscribe.value();
    });

    return {
        data,
        refetch,
        isLoading,
        isFetching,
        error
    }
  },
};
*/