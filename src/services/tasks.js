import { callApi } from '@/utils/apiUtils';
import { tasks } from '@/utils/endpoints/tasks';

export const createTask = ({ body }) => callApi({ uriEndPoint: tasks.createTask.v1, body });
export const updateTask = ({ body, pathParams }) =>
  callApi({ uriEndPoint: tasks.updateTask.v1, body, pathParams });

export const getAllTasks = ({ query }) => callApi({ uriEndPoint: tasks.getAllTasks.v1, query });

export const getSingleTask = ({ pathParams }) =>
  callApi({ uriEndPoint: tasks.getSingleTask.v1, pathParams });

export const deleteTask = ({ pathParams }) =>
  callApi({ uriEndPoint: tasks.deleteTask.v1, pathParams });
