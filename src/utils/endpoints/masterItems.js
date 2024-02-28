const { defaults } = require('./defaults');

export const masterItems = {
  create: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/items',
    },
  },
  update: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: '/items/:itemId',
    },
  },
  getSingle: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/items/:itemId',
    },
  },
  getList: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/items',
    },
  },
  importCsvData: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/items/import',
    },
  },
};
