const { defaults } = require('./defaults');

export const school = {
  addSchool: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/school/create',
    },
  },
  addCourse: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/school/add-course',
    },
  },
  addBranch: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/school/add-branch',
    },
  },
  updateSchool: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: '/school/update/:schoolId',
    },
  },
  updateCourse: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: '/school/courseData',
    },
  },
  updateBranch: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: '/school/branch/:branchId',
    },
  },
  getSchoolDetails: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/school/:schoolId',
    },
  },
  getSchoolCourses: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/school/courses/:schoolId',
    },
  },
  getSchoolAllCourses: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/school/getSchoolCourse/:schoolId',
    },
  },
  getSchoolSubBranchs: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/school/:schoolId/branch',
    },
  },
  deleteCourseType: {
    v1: {
      ...defaults.methods.DELETE,
      ...defaults.versions.v1,
      uri: '/school/delete-courseType',
    },
  },
  deleteCourse: {
    v1: {
      ...defaults.methods.DELETE,
      ...defaults.versions.v1,
      uri: '/school/delete-course/:courseId',
    },
  },
  deleteBranch: {
    v1: {
      ...defaults.methods.DELETE,
      ...defaults.versions.v1,
      uri: '/school/branch/:branchId',
    },
  },
  deleteBranchCourse: {
    v1: {
      ...defaults.methods.DELETE,
      ...defaults.versions.v1,
      uri: '/school/branch/course/:courseBranchId',
    },
  },
  updateBranchCourseStatus: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: '/school/branch/course/:courseBranchId',
    },
  },
  getAllSchool: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/school/all',
    },
  },
  getCountryCode: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/school/getCountryCode',
    },
  },
  searchProgramCourse: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/school/search/courses',
    },
  },
  getCourseBranchs: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/school/:schoolId/course/:courseId',
    },
  },
  linkStudentWithCourse: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/application/create',
    },
  },
};
