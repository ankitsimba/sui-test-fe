import {
  createAgent,
  updateAgent,
  getAllAgents,
  getAgentDetails,
  getAgentStudents,
  getAgentApplications,
  resendInvitation,
  changeAgentStatus,
} from '@/services/agent';

const Model = {
  namespace: 'agent',
  state: {
    agentsList: null,
    agentDetails: null,
    agentStudents: null,
    agentApplications: null,
  },
  effects: {
    *createAgent({ payload }, { call }) {
      try {
        const res = yield call(createAgent, payload);
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    *updateAgent({ payload }, { call }) {
      try {
        const res = yield call(updateAgent, payload);
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    *getAllAgents({ payload }, { call, put }) {
      try {
        const res = yield call(getAllAgents, payload);
        yield put({
          type: 'setStates',
          payload: res,
          key: 'agentsList',
        });
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    *getAgentDetails({ payload }, { call, put }) {
      try {
        const res = yield call(getAgentDetails, payload);
        yield put({
          type: 'setStates',
          payload: res,
          key: 'agentDetails',
        });
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    *getAgentStudents({ payload }, { call, put }) {
      try {
        const res = yield call(getAgentStudents, payload);
        yield put({
          type: 'setStates',
          payload: res,
          key: 'agentStudents',
        });
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    *getAgentApplications({ payload }, { call, put }) {
      try {
        const res = yield call(getAgentApplications, payload);
        yield put({
          type: 'setStates',
          payload: res,
          key: 'agentApplications',
        });
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    *resendInvitation({ payload }, { call }) {
      try {
        const res = yield call(resendInvitation, payload);
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    *changeAgentStatus({ payload }, { call }) {
      try {
        const res = yield call(changeAgentStatus, payload);
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
