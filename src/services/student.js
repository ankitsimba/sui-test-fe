import { callApi } from '@/utils/apiUtils';
import { student } from '@/utils/endpoints/student';

export const addStudent = ({ body }) => callApi({ uriEndPoint: student.addStudent.v1, body });

export const getAllStudent = ({ query }) =>
  callApi({ uriEndPoint: student.getAllStudent.v1, query });

export const getSingleStudent = ({ pathParams }) =>
  callApi({ uriEndPoint: student.getSingleStudent.v1, pathParams });

export const addStudentNotes = ({ body }) =>
  callApi({ uriEndPoint: student.addStudentNotes.v1, body });

export const getSingleStudentNotes = ({ pathParams, query }) =>
  callApi({ uriEndPoint: student.getSingleStudentNotes.v1, pathParams, query });

export const updateStudentNote = ({ pathParams, body }) =>
  callApi({ uriEndPoint: student.updateStudentNote.v1, pathParams, body });

export const deleteStudentNote = ({ pathParams }) =>
  callApi({ uriEndPoint: student.deleteStudentNote.v1, pathParams });
export const getUploadedDocs = ({ pathParams, query }) =>
  callApi({ uriEndPoint: student.getUploadedDocs.v1, pathParams, query });
export const postStudentDocuments = ({ body }) =>
  callApi({ uriEndPoint: student.postStudentDocuments.v1, body });

export const changeDocumentStatus = ({ pathParams, body }) =>
  callApi({ uriEndPoint: student.changeDocumentStatus.v1, pathParams, body });

export const sendDocmentStatusNotification = ({ pathParams, body }) =>
  callApi({ uriEndPoint: student.sendDocmentStatusNotification.v1, pathParams, body });

export const getStudentActivityLogs = ({ pathParams }) =>
  callApi({ uriEndPoint: student.getStudentActivityLogs.v1, pathParams });

export const updateStudentDetails = ({ pathParams, body }) =>
  callApi({ uriEndPoint: student.updateStudentDetails.v1, pathParams, body });
export const updateStudentEducationDetails = ({ pathParams, body }) =>
  callApi({ uriEndPoint: student.updateStudentEducationDetails.v1, pathParams, body });

export const addStudentEducationDetails = ({ pathParams, body }) =>
  callApi({ uriEndPoint: student.addStudentEducationDetails.v1, pathParams, body });

export const updateTestAndBackgroundDetails = ({ pathParams, body }) =>
  callApi({ uriEndPoint: student.updateTestAndBackgroundDetails.v1, pathParams, body });

export const getBranchCourses = ({ pathParams }) =>
  callApi({ uriEndPoint: student.getBranchCourses.v1, pathParams });

  export const updateStudentStatus = ({ pathParams, body }) =>
  callApi({ uriEndPoint: student.updateStatus.v1, pathParams, body });
