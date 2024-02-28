import { callApi } from '@/utils/apiUtils';
import { batches } from '@/utils/endpoints/batches';

export const createBatch = ({ body }) => callApi({ uriEndPoint: batches.create.v1, body });
export const updateBatch = ({ body, pathParams }) =>
  callApi({ uriEndPoint: batches.update.v1, body, pathParams });
export const getSingleBatch = ({ pathParams }) =>
  callApi({ uriEndPoint: batches.getSingle.v1, pathParams });

export const getAllBatches = ({ query }) => callApi({ uriEndPoint: batches.getList.v1, query });
