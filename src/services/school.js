import { callApi } from '@/utils/apiUtils';
import { school } from '@/utils/endpoints/school';

export const addSchoolService = ({ body }) => callApi({ uriEndPoint: school?.addSchool?.v1, body });
export const updateSchool = ({ body, pathParams }) =>
  callApi({ uriEndPoint: school?.updateSchool?.v1, body, pathParams });

export const addCourseService = ({ body }) => callApi({ uriEndPoint: school?.addCourse?.v1, body });
export const updateCourse = ({ body, pathParams }) =>
  callApi({ uriEndPoint: school?.updateCourse?.v1, body, pathParams });

export const addBranchService = ({ body }) => callApi({ uriEndPoint: school?.addBranch?.v1, body });
export const updateBranch = ({ body, pathParams }) =>
  callApi({ uriEndPoint: school?.updateBranch?.v1, body, pathParams });

export const getAllSchool = ({ query }) =>
  callApi({ uriEndPoint: school?.getAllSchool?.v1, query });

export const getSchoolDetails = ({ pathParams }) =>
  callApi({ uriEndPoint: school?.getSchoolDetails?.v1, pathParams });

export const getSchoolCourses = ({ pathParams }) =>
  callApi({ uriEndPoint: school?.getSchoolCourses?.v1, pathParams });

export const getSchoolSubBranchs = ({ pathParams }) =>
  callApi({ uriEndPoint: school?.getSchoolSubBranchs?.v1, pathParams });
export const deleteCourseType = ({ body }) =>
  callApi({ uriEndPoint: school?.deleteCourseType?.v1, body });

export const deleteCourse = ({ pathParams, body }) =>
  callApi({ uriEndPoint: school?.deleteCourse?.v1, pathParams, body });
export const deleteBranch = ({ pathParams, body }) =>
  callApi({ uriEndPoint: school?.deleteBranch?.v1, pathParams, body });

export const getSchoolAllCourses = ({ pathParams }) =>
  callApi({ uriEndPoint: school?.getSchoolAllCourses?.v1, pathParams });

export const deleteBranchCourse = ({ pathParams }) =>
  callApi({ uriEndPoint: school?.deleteBranchCourse?.v1, pathParams });

export const updateBranchCourseStatus = ({ pathParams, body }) =>
  callApi({ uriEndPoint: school?.updateBranchCourseStatus?.v1, pathParams, body });

export const getCountryCode = () => callApi({ uriEndPoint: school?.getCountryCode?.v1 });

export const searchProgramCourse = ({ query }) =>
  callApi({ uriEndPoint: school?.searchProgramCourse?.v1, query });

export const getCourseBranchs = ({ pathParams }) =>
  callApi({ uriEndPoint: school?.getCourseBranchs?.v1, pathParams });
export const linkStudentWithCourse = ({ body }) =>
  callApi({ uriEndPoint: school?.linkStudentWithCourse?.v1, body });
