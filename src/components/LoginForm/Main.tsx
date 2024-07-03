import { fetchLogin, fetchUserInfo } from '@/services/user';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import {
  LoginForm,
  ProConfigProvider,
  ProFormText,
} from '@ant-design/pro-components';
import { history, useModel } from '@umijs/max';
import { FormProps, theme } from 'antd';
import { flushSync } from 'react-dom';

type FieldType = {
  username?: string;
  password?: string;
};

const LoginFormMain = () => {
  const { token } = theme.useToken();
  const { setInitialState } = useModel('@@initialState');

  const handleLogin = async (payload: any) => {
    try {
      const loginResult = await fetchLogin(payload);
      const loginData = loginResult.data;

      if (!loginData.success) {
        throw new Error(loginData.message);
      }

      localStorage.setItem('token', loginData.data.token);

      const userInfoResult = await fetchUserInfo();
      const userInfoData = userInfoResult.data;

      if (!userInfoData.success) {
        throw new Error(userInfoData.message);
      }

      flushSync(() => {
        setInitialState({
          roleType: userInfoData.data.type,
          login: true,
        });
      });

      history.replace('/dashboard/list');
    } catch (error) {
      console.log('error', error);
    }
  };

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    console.log('values', values);
    handleLogin(values);
  };

  return (
    <ProConfigProvider hashed={false}>
      <div style={{ backgroundColor: token.colorBgContainer }}>
        <LoginForm title="KMS Login" onFinish={onFinish} autoComplete="off">
          <div style={{ marginTop: 28, textAlign: 'center' }}>
            <ProFormText
              name="username"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={'prefixIcon'} />,
              }}
              placeholder={'用户名: admin or umi'}
              rules={[
                {
                  required: true,
                  message: '请输入用户名!',
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={'prefixIcon'} />,
              }}
              placeholder={'密码: 123'}
              rules={[
                {
                  required: true,
                  message: '请输入密码！',
                },
              ]}
            />
          </div>
        </LoginForm>
      </div>
    </ProConfigProvider>
  );
};

export default LoginFormMain;
