const { defaults } = require('./defaults');

export const salesInvoice = {
  create: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/salesInvoice',
    },
  },

  getList: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/salesInvoice',
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
