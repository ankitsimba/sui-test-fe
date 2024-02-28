import { createProduct, deleteProduct, getAllProducts, updateProduct } from '@/services/products';

const Model = {
  namespace: 'products',
  state: {
    productList: null,
  },
  effects: {
    *createProduct({ payload }, { call }) {
      try {
        const res = yield call(createProduct, payload);
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    *updateProduct({ payload }, { call }) {
      try {
        const res = yield call(updateProduct, payload);
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    *deleteProduct({ payload }, { call }) {
      try {
        const res = yield call(deleteProduct, payload);
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    *getAllProducts({ payload }, { call, put }) {
      try {
        const res = yield call(getAllProducts, payload);
        yield put({
          type: 'setStates',
          payload: res,
          key: 'productList',
        });
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
  },

  reducers: {
    setStates(state, { payload, key }) {
      return {
        ...state,
        [key]: payload,
      };
    },
  },
};
export default Model;
