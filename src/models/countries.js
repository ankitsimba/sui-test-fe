import {
  createCountry,
  getAllCountries,
  importCountriesCSVData,
  updateCountry,
} from '@/services/countries';

const Model = {
  namespace: 'countries',
  state: {
    countriesList: null,
  },
  effects: {
    *createCountry({ payload }, { call }) {
      try {
        const res = yield call(createCountry, payload);
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    *importCountriesCSVData({ payload }, { call }) {
      try {
        const res = yield call(importCountriesCSVData, payload);
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    *updateCountry({ payload }, { call }) {
      try {
        const res = yield call(updateCountry, payload);
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    *getAllCountries({ payload }, { call, put }) {
      try {
        const res = yield call(getAllCountries, payload);
        yield put({
          type: 'setStates',
          payload: res,
          key: 'countriesList',
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
