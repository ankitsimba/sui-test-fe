const { defaults } = require('./defaults');

export const course = {
  getAllCourses: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/courses/all',
    },
  },
};
