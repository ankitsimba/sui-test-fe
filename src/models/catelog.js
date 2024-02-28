import { createCatelog, getAllCatelog, getSingleCatelog, updateCatelog } from '@/services/catelog';

const Model = {
  namespace: 'catelog',
  state: {
    vendorItemsList: null,
  },
  effects: {
    *createCatelog({ payload }, { call }) {
      try {
        const res = yield call(createCatelog, payload);
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    *updateCatelog({ payload }, { call }) {
      try {
        const res = yield call(updateCatelog, payload);
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    *getSingleCatelog({ payload }, { call }) {
      try {
        const res = yield call(getSingleCatelog, payload);
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    *getAllCatelog({ payload }, { call, put }) {
      try {
        const res = yield call(getAllCatelog, payload);
        yield put({
          type: 'setStates',
          payload: res,
          key: 'vendorItemsList',
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
