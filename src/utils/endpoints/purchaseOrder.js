const { defaults } = require('./defaults');

export const purchaseOrder = {
  create: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/purchaseOrder',
    },
  },

  getList: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/purchaseOrder',
    },
  },
  getVendorListForOrder: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/purchaseOrder/vendors',
    },
  },
};
