import { callApi } from '@/utils/apiUtils';

import { purchaseOrder } from '@/utils/endpoints/purchaseOrder';

export const createOrder = ({ body }) => callApi({ uriEndPoint: purchaseOrder.create.v1, body });

export const getAllOrders = ({ query }) =>
  callApi({ uriEndPoint: purchaseOrder.getList.v1, query });
export const getVendorListForOrder = ({ body }) =>
  callApi({ uriEndPoint: purchaseOrder.getVendorListForOrder.v1, body });
