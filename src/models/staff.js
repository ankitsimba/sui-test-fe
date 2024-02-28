import {
  createStaff,
  getStaffList,
  getStaffDetails,
  getStaffTasks,
  changeTaskStatus,
  updateStaffDetails,
  inviteUser
} from '@/services/staff';

const Model = {
  namespace: 'staff',
  state: {
    staffList: null,
    staffDetails: null,
    staffTasksList: null,
  },
  effects: {
    *createStaff({ payload }, { call }) {
      try {
        const apiResponse = yield call(createStaff, payload);
        return apiResponse;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    *inviteUser({ payload }, { call }) {
      try {
        const apiResponse = yield call(inviteUser, payload);
        return apiResponse;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    *updateStaffDetails({ payload }, { call }) {
      try {
        const apiResponse = yield call(updateStaffDetails, payload);
        return apiResponse;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    *getStaffDetails({ payload }, { call, put }) {
      try {
        const res = yield call(getStaffDetails, payload);
        yield put({
          type: 'setStates',
          payload: res,
          key: 'staffDetails',
        });
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    *getStaffTasks({ payload }, { call, put }) {
      try {
        const res = yield call(getStaffTasks, payload);
        yield put({
          type: 'setStates',
          payload: res,
          key: 'staffTasksList',
        });
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    *changeTaskStatus({ payload }, { call }) {
      try {
        const apiResponse = yield call(changeTaskStatus, payload);
        return apiResponse;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    *getStaffList({ payload }, { call, put }) {
      try {
        const res = yield call(getStaffList, payload);
        yield put({
          type: 'setStates',
          payload: res,
          key: 'staffList',
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
