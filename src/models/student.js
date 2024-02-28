import {
  addStudent,
  getAllStudent,
  getSingleStudent,
  addStudentNotes,
  getSingleStudentNotes,
  updateStudentNote,
  deleteStudentNote,
  getUploadedDocs,
  postStudentDocuments,
  changeDocumentStatus,
  sendDocmentStatusNotification,
  getStudentActivityLogs,
  updateStudentDetails,
  updateStudentEducationDetails,
  updateTestAndBackgroundDetails,
  addStudentEducationDetails,
  getBranchCourses,
  updateStudentStatus,
} from '@/services/student';

const Model = {
  namespace: 'student',
  state: {
    allStudent: null,
    singleStudent: null,
    singleStudentNotes: null,
    uploadedDocsList: null,
    studentActivityLogs: null,
    branchCoursesList: null,
  },
  effects: {
    *addStudent({ payload }, { call }) {
      try {
        const res = yield call(addStudent, payload);
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },

    *getAllStudent({ payload }, { call, put }) {
      try {
        const res = yield call(getAllStudent, payload);
        yield put({
          type: 'setStates',
          payload: res,
          key: 'allStudent',
        });
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    *getSingleStudent({ payload }, { call, put }) {
      try {
        const res = yield call(getSingleStudent, payload);
        yield put({
          type: 'setStates',
          payload: res,
          key: 'singleStudent',
        });
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    *addStudentNotes({ payload }, { call }) {
      try {
        const res = yield call(addStudentNotes, payload);
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    *updateStudentNote({ payload }, { call }) {
      try {
        const res = yield call(updateStudentNote, payload);
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    *getSingleStudentNotes({ payload }, { call, put }) {
      try {
        const res = yield call(getSingleStudentNotes, payload);
        yield put({
          type: 'setStates',
          payload: res,
          key: 'singleStudentNotes',
        });
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    *deleteStudentNote({ payload }, { call }) {
      try {
        const res = yield call(deleteStudentNote, payload);
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    *postStudentDocuments({ payload }, { call }) {
      try {
        const res = yield call(postStudentDocuments, payload);
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    *changeDocumentStatus({ payload }, { call }) {
      try {
        const res = yield call(changeDocumentStatus, payload);
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    *sendDocmentStatusNotification({ payload }, { call }) {
      try {
        const res = yield call(sendDocmentStatusNotification, payload);
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    *getUploadedDocs({ payload }, { call, put }) {
      try {
        const res = yield call(getUploadedDocs, payload);
        yield put({
          type: 'setStates',
          payload: res,
          key: 'uploadedDocsList',
        });
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    *getStudentActivityLogs({ payload }, { call, put }) {
      try {
        const res = yield call(getStudentActivityLogs, payload);
        yield put({
          type: 'setStates',
          payload: res,
          key: 'studentActivityLogs',
        });
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    *getBranchCourses({ payload }, { call, put }) {
      try {
        const res = yield call(getBranchCourses, payload);
        yield put({
          type: 'setStates',
          payload: res,
          key: 'branchCoursesList',
        });
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    *updateStudentDetails({ payload }, { call }) {
      try {
        const res = yield call(updateStudentDetails, payload);
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    *updateStudentEducationDetails({ payload }, { call }) {
      try {
        const res = yield call(updateStudentEducationDetails, payload);
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    *updateTestAndBackgroundDetails({ payload }, { call }) {
      try {
        const res = yield call(updateTestAndBackgroundDetails, payload);
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    *addStudentEducationDetails({ payload }, { call }) {
      try {
        const res = yield call(addStudentEducationDetails, payload);
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    *updateStudentStatus({ payload }, { call }) {
      try {
        const res = yield call(updateStudentStatus, payload);
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
