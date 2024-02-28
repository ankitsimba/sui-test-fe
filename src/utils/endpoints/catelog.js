const { defaults } = require('./defaults');

export const catelog = {
  create: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/catelog',
    },
  },
  update: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: '/catelog/:catelogId',
    },
  },
  getList: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/catelog',
    },
  },
  getSingle: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: '/catelog/:catelogId',
    },
  },
};
