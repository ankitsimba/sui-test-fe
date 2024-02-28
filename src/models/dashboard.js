import { getDashboardStats } from '@/services/dashboard';

const Model = {
  namespace: 'dashboard',
  state: {
    dashboardStats: null,
  },
  effects: {
    *getDashboardStats({ payload }, { call, put }) {
      try {
        const res = yield call(getDashboardStats, payload);
        yield put({
          type: 'setStates',
          payload: res,
          key: 'dashboardStats',
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
