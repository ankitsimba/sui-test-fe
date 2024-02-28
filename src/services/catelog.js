import { callApi } from '@/utils/apiUtils';

import { catelog } from '@/utils/endpoints/catelog';

export const createCatelog = ({ body }) => callApi({ uriEndPoint: catelog.create.v1, body });
export const updateCatelog = ({ body, pathParams }) =>
  callApi({ uriEndPoint: catelog.update.v1, body, pathParams });
export const getSingleCatelog = ({ pathParams }) =>
  callApi({ uriEndPoint: catelog.getSingle.v1, pathParams });

export const getAllCatelog = ({ query }) => callApi({ uriEndPoint: catelog.getList.v1, query });
