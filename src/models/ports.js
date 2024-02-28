import { createPort, getAllPorts, updatePort, importPortCSVData } from '@/services/ports';

const Model = {
  namespace: 'ports',
  state: {
    portsList: null,
  },
  effects: {
    *createPort({ payload }, { call }) {
      try {
        const res = yield call(createPort, payload);
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    *importPortCSVData({ payload }, { call }) {
      try {
        const res = yield call(importPortCSVData, payload);
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    *updatePort({ payload }, { call }) {
      try {
        const res = yield call(updatePort, payload);
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    *getAllPorts({ payload }, { call, put }) {
      try {
        const res = yield call(getAllPorts, payload);
        yield put({
          type: 'setStates',
          payload: res,
          key: 'portsList',
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
