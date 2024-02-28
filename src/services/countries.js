import { callApi } from '@/utils/apiUtils';
import { countries } from '@/utils/endpoints/countries';

export const createCountry = ({ body }) =>
  callApi({ uriEndPoint: countries.createCountry.v1, body });
export const importCountriesCSVData = ({ body }) =>
  callApi({ uriEndPoint: countries.importCountriesCSVData.v1, body });
export const updateCountry = ({ body, pathParams }) =>
  callApi({ uriEndPoint: countries.updateCountry.v1, body, pathParams });

export const getAllCountries = ({ query }) =>
  callApi({ uriEndPoint: countries.getAllCountries.v1, query });
