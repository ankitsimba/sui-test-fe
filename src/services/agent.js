import { callApi } from '@/utils/apiUtils';
import { agent } from '@/utils/endpoints/agent';

export const createAgent = ({ body }) => callApi({ uriEndPoint: agent.createAgent.v1, body });

export const getAllAgents = ({ query }) => callApi({ uriEndPoint: agent.getAllAgents.v1, query });

export const getAgentDetails = ({ pathParams }) =>
  callApi({ uriEndPoint: agent.getAgentDetails.v1, pathParams });

export const getAgentStudents = ({ pathParams, query }) =>
  callApi({ uriEndPoint: agent.getAgentStudents.v1, pathParams, query });

export const getAgentApplications = ({ pathParams, query }) =>
  callApi({ uriEndPoint: agent.getAgentApplications.v1, pathParams, query });

export const updateAgent = ({ pathParams }) =>
  callApi({ uriEndPoint: agent.updateAgent.v1, pathParams });

export const resendInvitation = ({ body }) =>
  callApi({ uriEndPoint: agent.resendInvitation.v1, body });

export const changeAgentStatus = ({ body, pathParams }) =>
  callApi({ uriEndPoint: agent.changeAgentStatus.v1, body, pathParams });
