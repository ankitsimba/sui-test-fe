import { callApi } from '@/utils/apiUtils';
import { ports } from '@/utils/endpoints/ports';

export const createPort = ({ body }) => callApi({ uriEndPoint: ports.createPort.v1, body });
export const importPortCSVData = ({ body }) =>
  callApi({ uriEndPoint: ports.importPortCSVData.v1, body });
export const updatePort = ({ body, pathParams }) =>
  callApi({ uriEndPoint: ports.updatePort.v1, body, pathParams });

export const getAllPorts = ({ query }) => callApi({ uriEndPoint: ports.getAllPorts.v1, query });
