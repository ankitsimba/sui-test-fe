import {
  addSchoolService,
  addCourseService,
  addBranchService,
  getAllSchool,
  updateSchool,
  updateCourse,
  updateBranch,
  getSchoolDetails,
  getSchoolCourses,
  getSchoolSubBranchs,
  deleteCourseType,
  deleteCourse,
  getSchoolAllCourses,
  deleteBranch,
  deleteBranchCourse,
  updateBranchCourseStatus,
  getCountryCode,
  searchProgramCourse,
  getCourseBranchs,
  linkStudentWithCourse,
} from '@/services/school';

const Model = {
  namespace: 'school',
  state: {
    allSchool: null,
    countryCodes: null,
    searchProgramCourseList: null,
    courseBranchsList: null,
  },
  effects: {
    *addSchool({ payload }, { call }) {
      try {
        const res = yield call(addSchoolService, payload);
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    *updateSchool({ payload }, { call }) {
      try {
        const res = yield call(updateSchool, payload);
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    *addCourse({ payload }, { call }) {
      try {
        const res = yield call(addCourseService, payload);
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    *updateCourse({ payload }, { call }) {
      try {
        const res = yield call(updateCourse, payload);
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    *addBranch({ payload }, { call }) {
      try {
        const res = yield call(addBranchService, payload);
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    *updateBranch({ payload }, { call }) {
      try {
        const res = yield call(updateBranch, payload);
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    *getAllSchool({ payload }, { call, put }) {
      try {
        const res = yield call(getAllSchool, payload);
        yield put({
          type: 'setStates',
          payload: res,
          key: 'allSchool',
        });
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    *getSchoolDetails({ payload }, { call }) {
      try {
        const res = yield call(getSchoolDetails, payload);

        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    *getSchoolCourses({ payload }, { call }) {
      try {
        const res = yield call(getSchoolCourses, payload);
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    *getSchoolSubBranchs({ payload }, { call }) {
      try {
        const res = yield call(getSchoolSubBranchs, payload);
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    *deleteCourseType({ payload }, { call }) {
      try {
        const res = yield call(deleteCourseType, payload);
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    *deleteCourse({ payload }, { call }) {
      try {
        const res = yield call(deleteCourse, payload);
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    *deleteBranch({ payload }, { call }) {
      try {
        const res = yield call(deleteBranch, payload);
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    *deleteBranchCourse({ payload }, { call }) {
      try {
        const res = yield call(deleteBranchCourse, payload);
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    *getCountryCode({ payload }, { call, put }) {
      try {
        const res = yield call(getCountryCode, payload);
        yield put({
          type: 'setStates',
          payload: res,
          key: 'countryCodes',
        });
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    *searchProgramCourse({ payload }, { call, put }) {
      try {
        const res = yield call(searchProgramCourse, payload);
        yield put({
          type: 'setStates',
          payload: res,
          key: 'searchProgramCourseList',
        });
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },

    *getCourseBranchs({ payload }, { call, put }) {
      try {
        const res = yield call(getCourseBranchs, payload);
        yield put({
          type: 'setStates',
          payload: res,
          key: 'courseBranchsList',
        });
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    *linkStudentWithCourse({ payload }, { call }) {
      try {
        const res = yield call(linkStudentWithCourse, payload);
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    *updateBranchCourseStatus({ payload }, { call }) {
      try {
        const res = yield call(updateBranchCourseStatus, payload);
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    *getSchoolAllCourses({ payload }, { call }) {
      try {
        const res = yield call(getSchoolAllCourses, payload);
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
