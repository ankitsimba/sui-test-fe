const { defaults } = require('./defaults');

export const vendors = {
  createVendor: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/vendors',
    },
  },
  updateVendor: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: '/vendors/:vendorId',
    },
  },
  getAllVendors: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/vendors',
    },
  },
  getSingleVendor: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/vendors/:vendorId',
    },
  },
  importVendorCSVData: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/vendors/import',
    },
  },
};
