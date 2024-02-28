import {
  createVendor,
  getAllVendors,
  getSingleVendor,
  importVendorCSVData,
  updateVendor,
} from '@/services/vendors';

const Model = {
  namespace: 'vendors',
  state: {
    vendorsList: null,
    vendorDetails: null,
  },
  effects: {
    *createVendor({ payload }, { call }) {
      try {
        const res = yield call(createVendor, payload);
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    *importVendorCSVData({ payload }, { call }) {
      try {
        const res = yield call(importVendorCSVData, payload);
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    *updateVendor({ payload }, { call }) {
      try {
        const res = yield call(updateVendor, payload);
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    *getAllVendors({ payload }, { call, put }) {
      try {
        const res = yield call(getAllVendors, payload);
        yield put({
          type: 'setStates',
          payload: res,
          key: 'vendorsList',
        });
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    *getSingleVendor({ payload }, { call, put }) {
      try {
        const res = yield call(getSingleVendor, payload);
        yield put({
          type: 'setStates',
          payload: res,
          key: 'vendorDetails',
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
