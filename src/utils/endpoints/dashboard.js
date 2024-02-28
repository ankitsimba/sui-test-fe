const { defaults } = require('./defaults');

export const dashboard = {
  getDashboardStats: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/dashboard/counts',
    },
  },
};
