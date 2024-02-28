import {
  getApplications,
  updateApplicationStatus,
  disableApplication,
} from '@/services/applications';

const Model = {
  namespace: 'applications',
  state: {
    allApplications: null,
  },
  effects: {
    *getApplications({ payload }, { call, put }) {
      try {
        const res = yield call(getApplications, payload);
        yield put({
          type: 'setStates',
          payload: res,
          key: 'allApplications',
        });
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    *updateApplicationStatus({ payload }, { call }) {
      try {
        const res = yield call(updateApplicationStatus, payload);
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    *disableApplication({ payload }, { call }) {
      try {
        const res = yield call(disableApplication, payload);
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
