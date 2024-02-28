import { callApi } from '@/utils/apiUtils';
import { uploadDocuments } from '@/utils/endpoints/uploadDocuments';

export const uploadDocument = ({ body }) =>
  callApi({ uriEndPoint: uploadDocuments.uploadDocument.v1, body });
