import { uploadDocument } from '@/services/uploadDocuments';

const Model = {
  namespace: 'uploadDocuments',
  state: {
    documentsList: null,
  },
  effects: {
    *uploadDocument({ payload }, { call }) {
      try {
        const res = yield call(uploadDocument, payload);
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
