const { defaults } = require('./defaults');

export const truckingCompany = {
  create: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/trucking',
    },
  },
  update: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: '/trucking/:truckCompanyId',
    },
  },
  getList: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/trucking',
    },
  },
  importTruckCompaninesCSVData: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/trucking/import',
    },
  },
};
