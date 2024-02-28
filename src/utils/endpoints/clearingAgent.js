const { defaults } = require('./defaults');

export const clearingAgent = {
  create: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/agent',
    },
  },
  update: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: '/agent/:agentId',
    },
  },
  getList: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/agent',
    },
  },
  importAgentCSVData: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/agent/import',
    },
  },
};
