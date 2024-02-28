import { createTask, updateTask, getAllTasks, getSingleTask, deleteTask } from '@/services/tasks';

const Model = {
  namespace: 'tasks',
  state: {
    taskList: null,
  },
  effects: {
    *createTask({ payload }, { call }) {
      try {
        const res = yield call(createTask, payload);
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    *updateTask({ payload }, { call }) {
      try {
        const res = yield call(updateTask, payload);
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    *getAllTasks({ payload }, { call, put }) {
      try {
        const res = yield call(getAllTasks, payload);
        yield put({
          type: 'setStates',
          payload: res,
          key: 'taskList',
        });
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    *getSingleTask({ payload }, { call }) {
      try {
        const res = yield call(getSingleTask, payload);
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    *deleteTask({ payload }, { call }) {
      try {
        const res = yield call(deleteTask, payload);
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
