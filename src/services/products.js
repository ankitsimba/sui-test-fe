import { callApi } from '@/utils/apiUtils';

import { products } from '@/utils/endpoints/products';

export const createProduct = ({ body }) => callApi({ uriEndPoint: products.create.v1, body });
export const updateProduct = ({ body, pathParams }) =>
  callApi({ uriEndPoint: products.update.v1, body, pathParams });
export const deleteProduct = ({ body, pathParams }) =>
  callApi({ uriEndPoint: products.delete.v1, body, pathParams });

export const getAllProducts = ({ query }) => callApi({ uriEndPoint: products.getList.v1, query });
