import { createBatch, getAllBatches, getSingleBatch, updateBatch } from '@/services/batches';

const Model = {
  namespace: 'batches',
  state: {
    batchList: null,
  },
  effects: {
    *createBatch({ payload }, { call }) {
      try {
        const res = yield call(createBatch, payload);
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    *updateBatch({ payload }, { call }) {
      try {
        const res = yield call(updateBatch, payload);
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    *getSingleBatch({ payload }, { call }) {
      try {
        const res = yield call(getSingleBatch, payload);
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    *getAllBatches({ payload }, { call, put }) {
      try {
        const res = yield call(getAllBatches, payload);
        yield put({
          type: 'setStates',
          payload: res,
          key: 'batchList',
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
