import imgUrl from './img-url';

describe('@utils/img-url', () => {
  it('format image path correctly for development', () => {
    process.env.VUE_APP_API_URL = '';
    const result = imgUrl('/arts/test.jpg');
    expect(result).toEqual('/arts/test.jpg');
  });

  it('format image path correctly for production', () => {
    process.env.VUE_APP_API_URL = 'http://example.com/';
    const result = imgUrl('/arts/test.jpg');
    expect(result).toEqual('http://example.com/arts/test.jpg');
  });
});
