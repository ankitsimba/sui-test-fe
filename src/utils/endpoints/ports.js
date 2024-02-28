const { defaults } = require('./defaults');

export const ports = {
  createPort: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/port',
    },
  },
  updatePort: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: '/port/:portId',
    },
  },
  getAllPorts: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/port',
    },
  },
  importPortCSVData: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/port/import',
    },
  },
};
