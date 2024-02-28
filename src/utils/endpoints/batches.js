const { defaults } = require('./defaults');

export const batches = {
  create: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/batches',
    },
  },
  update: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: '/batches/:batchId',
    },
  },
  getList: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/batches',
    },
  },
  getSingle: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: '/batches/:batchId',
    },
  },
};
