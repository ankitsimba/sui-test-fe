import { createInvoice, getAllInvoice } from '@/services/salesInvoice';

const Model = {
  namespace: 'salesInvoice',
  state: {
    invoiceList: null,
  },
  effects: {
    *createInvoice({ payload }, { call }) {
      try {
        const res = yield call(createInvoice, payload);
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },

    *getAllInvoice({ payload }, { call, put }) {
      try {
        const res = yield call(getAllInvoice, payload);
        yield put({
          type: 'setStates',
          payload: res,
          key: 'invoiceList',
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
