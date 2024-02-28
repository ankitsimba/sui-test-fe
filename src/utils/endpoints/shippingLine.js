const { defaults } = require('./defaults');

export const ShippingLine = {
  createShippingLine: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/shippingLine',
    },
  },
  updateShippingLine: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: '/shippingLine/:shippingLineId',
    },
  },
  getAllShippingLine: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/shippingLine',
    },
  },
  importShippingLineCSVData: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/shippingLine/import',
    },
  },
};
