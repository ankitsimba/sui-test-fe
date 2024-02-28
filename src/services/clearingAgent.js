import { callApi } from '@/utils/apiUtils';
import { clearingAgent } from '@/utils/endpoints/clearingAgent';

export const createClearingAgent = ({ body }) =>
  callApi({ uriEndPoint: clearingAgent.create.v1, body });
export const updateClearingAgent = ({ body, pathParams }) =>
  callApi({ uriEndPoint: clearingAgent.update.v1, body, pathParams });

export const getAllClearingAgent = ({ query }) =>
  callApi({ uriEndPoint: clearingAgent.getList.v1, query });
export const importAgentCSVData = ({ body }) =>
  callApi({ uriEndPoint: clearingAgent.importAgentCSVData.v1, body });
