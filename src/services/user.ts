import httpServer from '@/utils/http';

export const fetchUserInfo = () => {
  return httpServer.get('/api/v1/user');
};

export const fetchLogin = (payload: any) => {
  return httpServer.post('/api/v1/login', payload);
};

export const fetchList = () => {
  return httpServer.get('/api/v1/list');
};
