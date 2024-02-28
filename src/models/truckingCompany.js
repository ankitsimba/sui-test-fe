import {
  createTruckingCompany,
  getAllTruckingCompany,
  importTruckCompaninesCSVData,
  updateTruckingCompany,
} from '@/services/truckingCompany';

const Model = {
  namespace: 'truckingCompany',
  state: {
    truckingCompanyList: null,
  },
  effects: {
    *createTruckingCompany({ payload }, { call }) {
      try {
        const res = yield call(createTruckingCompany, payload);
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    *importTruckCompaninesCSVData({ payload }, { call }) {
      try {
        const res = yield call(importTruckCompaninesCSVData, payload);
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    *updateTruckingCompany({ payload }, { call }) {
      try {
        const res = yield call(updateTruckingCompany, payload);
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    *getAllTruckingCompany({ payload }, { call, put }) {
      try {
        const res = yield call(getAllTruckingCompany, payload);
        yield put({
          type: 'setStates',
          payload: res,
          key: 'truckingCompanyList',
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
