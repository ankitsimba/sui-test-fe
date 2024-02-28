const { defaults } = require('./defaults');

export const portInventory = {
  create: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/portInventory',
    },
  },
  getList: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/portInventory',
    },
  },
  update: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: '/portInventory/:portInventoryId',
    },
  },
};
