const { defaults } = require('./defaults');

export const uploadDocuments = {
  uploadDocument: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/upload',
    },
  },
};
