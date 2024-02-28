import { callApi } from '@/utils/apiUtils';
import { truckingCompany } from '@/utils/endpoints/truckingCompany';

export const createTruckingCompany = ({ body }) =>
  callApi({ uriEndPoint: truckingCompany.create.v1, body });
export const importTruckCompaninesCSVData = ({ body }) =>
  callApi({ uriEndPoint: truckingCompany.importTruckCompaninesCSVData.v1, body });
export const updateTruckingCompany = ({ body, pathParams }) =>
  callApi({ uriEndPoint: truckingCompany.update.v1, body, pathParams });

export const getAllTruckingCompany = ({ query }) =>
  callApi({ uriEndPoint: truckingCompany.getList.v1, query });
