import apiPath from './api-path';

describe('@utils/api-path', () => {
  it('format api path correctly for development', () => {
    process.env.VUE_APP_API_URL = '';
    const result = apiPath('/test');
    expect(result).toEqual('/api/test');
  });

  it('format api path correctly for production', () => {
    process.env.VUE_APP_API_URL = 'http://example.com/';
    const result = apiPath('/test');
    expect(result).toEqual('http://example.com/api/test');
  });
});
