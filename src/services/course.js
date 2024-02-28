import { callApi } from '@/utils/apiUtils';
import { course } from '@/utils/endpoints/course';

export const getAllCourses = () => callApi({ uriEndPoint: course.getAllCourses.v1,  });
