import { callApi } from '@/utils/apiUtils';
import { ShippingLine } from '@/utils/endpoints/shippingLine';

export const createShippingLine = ({ body }) =>
  callApi({ uriEndPoint: ShippingLine.createShippingLine.v1, body });
export const importShippingLineCSVData = ({ body }) =>
  callApi({ uriEndPoint: ShippingLine.importShippingLineCSVData.v1, body });
export const updateShippingLine = ({ body, pathParams }) =>
  callApi({ uriEndPoint: ShippingLine.updateShippingLine.v1, body, pathParams });

export const getAllShippingLine = ({ query }) =>
  callApi({ uriEndPoint: ShippingLine.getAllShippingLine.v1, query });
