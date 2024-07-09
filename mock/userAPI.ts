const users = ['admin', 'umi'];

export default {
  'GET /api/v1/user': (req: any, res: any) => {
    if (!req.headers['authorization']) {
      return res.json({
        success: false,
        errorCode: 1001,
        errorMessage: '没有权限',
      });
    }
    const auth = req.headers['authorization'];

    if (auth === 'admin') {
      return res.json({
        success: true,
        errorCode: 0,
        data: {
          type: 'admin',
        },
      });
    } else {
      return res.json({
        success: true,
        errorCode: 0,
        data: {
          type: 'base',
        },
      });
    }
  },
  'POST /api/v1/login': (req: any, res: any) => {
    const { username } = req.body;
    if (users.includes(username)) {
      res.json({
        success: true,
        errorCode: 0,
        data: {
          token: username === 'admin' ? 'admin' : 'base',
        },
      });
    } else {
      res.json({
        success: false,
        errorCode: 1001,
        errorMessage: '账号错误',
      });
    }
  },
  'GET /api/v1/list': (req: any, res: any) => {
    res.json({
      success: true,
      errorCode: 0,
      data: [
        {
          id: 1,
          name: '张三',
        },
        {
          id: 2,
          name: '李四',
        },
      ],
    });
  },
};
