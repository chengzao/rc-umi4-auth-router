import { history, useModel } from '@umijs/max';
import React from 'react';
import { flushSync } from 'react-dom';

import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';

interface Props {
  name: string;
}

type FieldType = {
  username?: string;
  password?: string;
};

// 脚手架示例组件
const Guide: React.FC<Props> = () => {
  const { setInitialState } = useModel('@@initialState');

  const fetchLogin = (playload: any) => {
    fetch('/api/v1/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(playload),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log('login', res);
        if (res.success) {
          flushSync(() => {
            setInitialState({
              roleType: res.data.token,
              login: true,
            });
          });
          history.replace('/dashboard/list');
          // window.location.reload();
          localStorage.setItem('token', res.data.token);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    console.log('values', values);
    fetchLogin(values);
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (
    errorInfo,
  ) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
      <Form
        name="basic"
        labelCol={{ flex: '126px' }}
        style={{ width: 500 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input
            size="large"
            placeholder="Enter your username"
            style={{ width: 300 }}
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password
            size="large"
            placeholder="Enter your password"
            style={{ width: 300 }}
          />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 6 }}>
          <Button type="primary" size="large" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Guide;
