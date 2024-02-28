import { callApi } from '@/utils/apiUtils';
import { vendors } from '@/utils/endpoints/vendors';

export const createVendor = ({ body }) => callApi({ uriEndPoint: vendors.createVendor.v1, body });
export const updateVendor = ({ body, pathParams }) =>
  callApi({ uriEndPoint: vendors.updateVendor.v1, body, pathParams });

export const getAllVendors = ({ query }) =>
  callApi({ uriEndPoint: vendors.getAllVendors.v1, query });

export const getSingleVendor = ({ pathParams }) =>
  callApi({ uriEndPoint: vendors.getSingleVendor.v1, pathParams });

export const importVendorCSVData = ({ body }) =>
  callApi({ uriEndPoint: vendors.importVendorCSVData.v1, body });
