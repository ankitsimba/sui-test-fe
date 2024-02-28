const { defaults } = require('./defaults');

export const student = {
  addStudent: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/student/create',
    },
  },
  getAllStudent: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/student/all/students',
    },
  },
  getSingleStudent: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/student/:studentId',
    },
  },
  addStudentNotes: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/student/add/note',
    },
  },
  getSingleStudentNotes: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/student/notes/all/:studentId',
    },
  },
  updateStudentNote: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: '/student/update/note/:noteId',
    },
  },
  deleteStudentNote: {
    v1: {
      ...defaults.methods.DELETE,
      ...defaults.versions.v1,
      uri: '/student/remove/note/:noteId',
    },
  },
  getUploadedDocs: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/student/docs/all',
    },
  },
  postStudentDocuments: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/student/upload/doc',
    },
  },
  changeDocumentStatus: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: '/student/update/doc/status/:docId',
    },
  },
  sendDocmentStatusNotification: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/student/remove/note/:noteId',
    },
  },
  getStudentActivityLogs: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/notification/:studentId',
    },
  },
  updateStudentDetails: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: '/student/update/:studentId',
    },
  },
  updateStudentEducationDetails: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: '/student/update/:studentId/education/:educationId',
    },
  },
  addStudentEducationDetails: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/student/:studentId/education',
    },
  },
  updateTestAndBackgroundDetails: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: '/student/update/:studentId/testScore',
    },
  },
  getBranchCourses: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/student/update/:studentId/testScore',
    },
  },
  updateStatus: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: '/student/update/status/:studentId',
    },
  },
};
