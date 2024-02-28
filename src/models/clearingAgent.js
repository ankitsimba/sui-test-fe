import {
  createClearingAgent,
  getAllClearingAgent,
  importAgentCSVData,
  updateClearingAgent,
} from '@/services/clearingAgent';

const Model = {
  namespace: 'clearingAgent',
  state: {
    clearingAgentList: null,
  },
  effects: {
    *createClearingAgent({ payload }, { call }) {
      try {
        const res = yield call(createClearingAgent, payload);
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    *importAgentCSVData({ payload }, { call }) {
      try {
        const res = yield call(importAgentCSVData, payload);
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    *updateClearingAgent({ payload }, { call }) {
      try {
        const res = yield call(updateClearingAgent, payload);
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    *getAllClearingAgent({ payload }, { call, put }) {
      try {
        const res = yield call(getAllClearingAgent, payload);
        yield put({
          type: 'setStates',
          payload: res,
          key: 'clearingAgentList',
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
