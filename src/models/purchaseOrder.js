import { createOrder, getAllOrders, getVendorListForOrder } from '@/services/purchaseOrder';

const Model = {
  namespace: 'purchaseOrder',
  state: {
    orderList: null,
    vendorListForOrder: null,
  },
  effects: {
    *createOrder({ payload }, { call }) {
      try {
        const res = yield call(createOrder, payload);
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },

    *getAllOrders({ payload }, { call, put }) {
      try {
        const res = yield call(getAllOrders, payload);
        yield put({
          type: 'setStates',
          payload: res,
          key: 'orderList',
        });
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    *getVendorListForOrder({ payload }, { call, put }) {
      try {
        const res = yield call(getVendorListForOrder, payload);

        yield put({
          type: 'setStates',
          payload: res,
          key: 'vendorListForOrder',
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
