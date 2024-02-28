const { defaults } = require('./defaults');

export const tasks = {
  createTask: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/tasks/create',
    },
  },
  updateTask: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: '/tasks/:taskId',
    },
  },
  getAllTasks: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/tasks/all',
    },
  },
  getSingleTask: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/tasks/:taskId',
    },
  },
  deleteTask: {
    v1: {
      ...defaults.methods.DELETE,
      ...defaults.versions.v1,
      uri: '/tasks/:taskId',
    },
  },
};
