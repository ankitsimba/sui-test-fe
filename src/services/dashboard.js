import { callApi } from '@/utils/apiUtils';
import { dashboard } from '@/utils/endpoints/dashboard';

export const getDashboardStats = () => callApi({ uriEndPoint: dashboard.getDashboardStats.v1 });
