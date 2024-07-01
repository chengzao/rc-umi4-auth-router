// 运行时配置

import { Link, RunTimeLayoutConfig, history } from '@umijs/max';

const loginPath = '/login';

async function getUserRoutes() {
  if (!localStorage.getItem('token')) {
    history.replace(loginPath);
    return undefined;
  }

  return fetch('/api/v1/routes', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token') || '',
    },
  })
    .then((res) => res.json())
    .catch((err) => {
      console.log(err);
      history.replace(loginPath);
    });
}

interface initialStateProps {
  roleType: string;
  login: boolean;
  roles?: string[];
}

const initialStateConfig: initialStateProps = {
  roleType: '',
  login: false,
  roles: [],
};

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<initialStateProps> {
  if (history.location.pathname !== loginPath) {
    const res = await getUserRoutes();
    if (res.success) {
      return {
        roleType: res.data.type,
        login: true,
        roles: res.data.roles,
      };
    } else {
      return { ...initialStateConfig };
    }
  }

  return { ...initialStateConfig };
}

export const layout: RunTimeLayoutConfig = ({
  initialState,
  setInitialState,
}) => {
  return {
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    menu: {
      locale: false,
    },
    menuItemRender(menuItemProps, defaultDom) {
      if (menuItemProps.isUrl) {
        return defaultDom;
      }
      if (menuItemProps.path && location.pathname !== menuItemProps.path) {
        return (
          <div>
            <Link to={menuItemProps.path} target={menuItemProps.target}>
              {defaultDom}
            </Link>
          </div>
        );
      }
      return defaultDom;
    },
    onPageChange: () => {
      const { location } = history;
      // 如果没有登录，重定向到 login
      if (!initialState?.login && location.pathname !== loginPath) {
        history.push(loginPath);
        setInitialState({ ...initialStateConfig });
      }
    },
    actionsRender: () => [],
    // menuFooterRender: () => <div>footer</div>,
    // menuHeaderRender: () => <div>header</div>,
    // onMenuHeaderClick: () => {
    //   console.log('onMenuHeaderClick');
    // },
  };
};
