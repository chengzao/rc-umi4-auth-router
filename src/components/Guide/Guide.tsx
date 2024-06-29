import { history, useModel } from '@umijs/max';
import { Input, Button } from 'antd';
import React, { useState } from 'react';
import { flushSync } from 'react-dom';

interface Props {
  name: string;
}

// 脚手架示例组件
const Guide: React.FC<Props> = () => {
  const [username, setUserName] = useState('');
  const { initialState, setInitialState } = useModel('@@initialState');

  const fetchLogin = (name: string) => {
    fetch("/api/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: name
      }),
    })
    .then((res) => res.json())
    .then((res) => {
      console.log('login', res);
      if(res.success) {
        flushSync(() => {
          setInitialState({
            ...initialState,
            roleType: res.data.token,
            login: true,
          });
        })
        history.replace('/dashboard/list');
        // window.location.reload();
        localStorage.setItem("token", res.data.token);
      }
    })
    .catch((err) => {
      console.log(err);
    });
  };

  const handleLogin = () => {
    console.log('login', username);
    const name = username || '';
    if(!name.trim()) return
    fetchLogin(name);
  }

  return (
    <div>
      <Input style={{ width: 200, marginRight: 10 }} placeholder="请输入" value={username} onChange={e => setUserName(e.target.value)} />
      <Button type="primary" onClick={handleLogin}>提交</Button>
    </div>
  );
};

export default Guide;
