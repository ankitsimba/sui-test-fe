import apiEndPoints from '@/utils/apiEndPoints';
import { callApi } from '@/utils/apiUtils';

export const createStaff = ({ body }) =>
  callApi({ uriEndPoint: apiEndPoints.staff.createStaff.v1, body });

export const getStaffList = ({query}) => callApi({ uriEndPoint: apiEndPoints.staff.getStaffList.v1,query });

export const getStaffDetails = ({ pathParams }) =>
  callApi({ uriEndPoint: apiEndPoints.staff.getStaffDetails.v1, pathParams });

export const getStaffTasks = ({ pathParams, query }) =>
  callApi({ uriEndPoint: apiEndPoints.staff.getStaffTasks.v1, pathParams, query });
export const changeTaskStatus = ({ pathParams, body }) =>
  callApi({ uriEndPoint: apiEndPoints.staff.changeTaskStatus.v1, pathParams, body });
export const updateStaffDetails = ({ pathParams, body }) =>
  callApi({ uriEndPoint: apiEndPoints.staff.updateStaffDetails.v1, pathParams, body });
  export const inviteUser = ({ body }) =>
  callApi({ uriEndPoint: apiEndPoints.staff.inviteUser.v1, body }); 
