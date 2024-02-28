import { getAllCourses } from '@/services/course';

const Model = {
  namespace: 'course',
  state: {
    allCourses:null
  },
  effects: {
   
    *getAllCourses({ payload }, { call, put }) {
        try {
          const res = yield call(getAllCourses, payload);
          yield put({
            type: 'setStates',
            payload: res,
            key: 'allCourses',
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
