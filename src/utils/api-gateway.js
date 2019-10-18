import axios from 'axios';
import * as qs from 'qs';
import { camelizeKeys, decamelizeKeys } from 'humps';

import apiPath from './api-path';

let apiGateway = axios.create({
  baseURL: apiPath(),
  transformRequest: [
    (d) => (d instanceof FormData ? d : decamelizeKeys(d)),
    ...axios.defaults.transformRequest,
  ],
  transformResponse: [...axios.defaults.transformResponse, camelizeKeys],
  paramsSerializer: function(params) {
    return qs.stringify(decamelizeKeys(params), { arrayFormat: 'brackets' });
  },
});

export default apiGateway;
