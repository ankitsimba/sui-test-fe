import { callApi } from '@/utils/apiUtils';
import { applications } from '@/utils/endpoints/applications';

export const getApplications = ({ query }) =>
  callApi({ uriEndPoint: applications.getApplications.v1, query });

export const updateApplicationStatus = ({ pathParams, body }) =>
  callApi({ uriEndPoint: applications.updateApplicationStatus.v1, pathParams, body });

export const disableApplication = ({ pathParams }) =>
  callApi({ uriEndPoint: applications.disableApplication.v1, pathParams });
