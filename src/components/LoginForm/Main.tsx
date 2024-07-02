import { fetchLogin } from '@/services/user';
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

  const handleLogin = (playload: any) => {
    fetchLogin(playload)
      .then((res) => {
        const result = res.data;
        if (result.success) {
          flushSync(() => {
            setInitialState({
              roleType: result.data.token,
              login: true,
            });
          });
          history.replace('/dashboard/list');
          // window.location.reload();
          localStorage.setItem('token', result.data.token);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    console.log('values', values);
    handleLogin(values);
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (
    errorInfo,
  ) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <ProConfigProvider hashed={false}>
      <div style={{ backgroundColor: token.colorBgContainer }}>
        <LoginForm
          title="KMS Login"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <div style={{ marginTop: 28, textAlign: 'center' }}>
            <ProFormText
              name="username"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={'prefixIcon'} />,
              }}
              placeholder={'用户名: admin or user'}
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
              placeholder={'密码: ant.design'}
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
