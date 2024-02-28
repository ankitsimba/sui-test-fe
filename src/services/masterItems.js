import { callApi } from '@/utils/apiUtils';
import { masterItems } from '@/utils/endpoints/masterItems';

export const createMasterItem = ({ body }) => callApi({ uriEndPoint: masterItems.create.v1, body });
export const updateMasterItem = ({ body, pathParams }) =>
  callApi({ uriEndPoint: masterItems.update.v1, body, pathParams });
export const getSingleMasterItem = ({ pathParams }) =>
  callApi({ uriEndPoint: masterItems.getSingle.v1, pathParams });

export const getAllMasterItem = ({ query }) =>
  callApi({ uriEndPoint: masterItems.getList.v1, query });
export const importCsvData = ({ body }) =>
  callApi({ uriEndPoint: masterItems.importCsvData.v1, body });
