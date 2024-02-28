import {
  createPortInventory,
  getAllPortInventory,
  updatePortInventory,
} from '@/services/portInventory';

const Model = {
  namespace: 'portInventory',
  state: {
    portInventoryList: null,
  },
  effects: {
    *createPortInventory({ payload }, { call }) {
      try {
        const res = yield call(createPortInventory, payload);
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    *updatePortInventory({ payload }, { call }) {
      try {
        const res = yield call(updatePortInventory, payload);
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },

    *getAllPortInventory({ payload }, { call, put }) {
      try {
        const res = yield call(getAllPortInventory, payload);
        yield put({
          type: 'setStates',
          payload: res,
          key: 'portInventoryList',
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
