import apiGateway from './api-gateway';

describe('@utils/api-gateway', () => {
  it('apiGateway object', () => {
    expect(typeof apiGateway).toEqual('function');
  });
});
