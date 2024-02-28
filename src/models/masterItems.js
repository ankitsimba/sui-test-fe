import {
  createMasterItem,
  getAllMasterItem,
  getSingleMasterItem,
  importCsvData,
  updateMasterItem,
} from '@/services/masterItems';

const Model = {
  namespace: 'masterItem',
  state: {
    masterItemsList: null,
    itemDetails: null,
    inventoryList: null,
  },
  effects: {
    *createMasterItem({ payload }, { call }) {
      try {
        const res = yield call(createMasterItem, payload);
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    *updateMasterItem({ payload }, { call }) {
      try {
        const res = yield call(updateMasterItem, payload);
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    *uploadCSV({ payload }, { call }) {
      try {
        const res = yield call(importCsvData, payload);
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    *getAllMasterItem({ payload }, { call, put }) {
      try {
        const res = yield call(getAllMasterItem, payload);
        yield put({
          type: 'setStates',
          payload: res,
          key: 'masterItemsList',
        });
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    *getAllInventory({ payload }, { call, put }) {
      try {
        const res = yield call(getAllMasterItem, payload);
        yield put({
          type: 'setStates',
          payload: res,
          key: 'inventoryList',
        });
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    *getSingleMasterItem({ payload }, { call, put }) {
      try {
        const res = yield call(getSingleMasterItem, payload);
        yield put({
          type: 'setStates',
          payload: res,
          key: 'itemDetails',
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
