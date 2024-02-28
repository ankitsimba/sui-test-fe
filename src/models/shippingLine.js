import {
  createShippingLine,
  getAllShippingLine,
  importShippingLineCSVData,
  updateShippingLine,
} from '@/services/shippingLine';

const Model = {
  namespace: 'shipping',
  state: {
    shippingLineList: null,
  },
  effects: {
    *createShippingLine({ payload }, { call }) {
      try {
        const res = yield call(createShippingLine, payload);
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    *importShippingLineCSVData({ payload }, { call }) {
      try {
        const res = yield call(importShippingLineCSVData, payload);
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    *updateShippingLine({ payload }, { call }) {
      try {
        const res = yield call(updateShippingLine, payload);
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    *getAllShippingLine({ payload }, { call, put }) {
      try {
        const res = yield call(getAllShippingLine, payload);
        yield put({
          type: 'setStates',
          payload: res,
          key: 'shippingLineList',
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
