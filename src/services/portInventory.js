import { callApi } from '@/utils/apiUtils';
import { portInventory } from '@/utils/endpoints/portInventory';

export const createPortInventory = ({ body }) =>
  callApi({ uriEndPoint: portInventory.create.v1, body });

export const updatePortInventory = ({ body, pathParams }) =>
  callApi({ uriEndPoint: portInventory.update.v1, body, pathParams });

export const getAllPortInventory = ({ query }) =>
  callApi({ uriEndPoint: portInventory.getList.v1, query });
