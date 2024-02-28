const { defaults } = require('./defaults');

export const applications = {
  getApplications: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/application/all',
    },
  },
  updateApplicationStatus: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: '/application/update/:applicationId',
    },
  },
  disableApplication: {
    v1: {
      ...defaults.methods.DELETE,
      ...defaults.versions.v1,
      uri: '/application/delete/:applicationId',
    },
  },
};
