const { defaults } = require('./defaults');

export const countries = {
  createCountry: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/countries',
    },
  },
  updateCountry: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: '/countries/:countryId',
    },
  },
  getAllCountries: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/countries',
    },
  },
  importCountriesCSVData: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/countries/import',
    },
  },
};
