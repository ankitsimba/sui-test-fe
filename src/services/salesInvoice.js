import { callApi } from '@/utils/apiUtils';

import { salesInvoice } from '@/utils/endpoints/salesInvoice';

export const createInvoice = ({ body }) => callApi({ uriEndPoint: salesInvoice.create.v1, body });

export const getAllInvoice = ({ query }) =>
  callApi({ uriEndPoint: salesInvoice.getList.v1, query });
