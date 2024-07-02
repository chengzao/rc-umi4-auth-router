import httpServer from '@/utils/http';

export const fetchUserInfo = () => {
  const token = localStorage.getItem('token');
  return httpServer('/api/v1/user', {
    method: 'GET',
    headers: {
      Authorization: token,
    },
  });
};

export const fetchLogin = (payload: any) => {
  return httpServer.post('/api/v1/login', payload);
};

export const fetchList = () => {
  return httpServer.get('/api/v1/list');
};
