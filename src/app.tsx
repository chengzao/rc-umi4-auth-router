import { Link, RunTimeLayoutConfig, history } from '@umijs/max';
import UnAccessible from './components/UnAccessible';
import { fetchUserInfo } from './services/user';
import { gotoLogin } from './utils/http';

const loginPath = '/login';

async function getUserRoutes() {
  if (!localStorage.getItem('token')) {
    gotoLogin();
    return undefined;
  }

  return fetchUserInfo()
    .then((res) => {
      const result = res.data;
      return result;
    })
    .catch((err) => {
      console.log(err);
      gotoLogin();
    });
}

interface initialStateProps {
  roleType: string;
  login: boolean;
  roles?: string[];
}

const defaultState: initialStateProps = {
  roleType: '',
  login: false,
  roles: [],
};

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
      return { ...defaultState };
    }
  }

  return { ...defaultState };
}

export const layout: RunTimeLayoutConfig = ({
  initialState,
  setInitialState,
}) => {
  return {
    title: 'KMS',
    menu: {
      locale: false,
    },
    layout: 'mix',
    unAccessible: <UnAccessible />,
    logout: () => {
      localStorage.removeItem('token');
      setInitialState({ ...defaultState });
      history.push(loginPath);
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
      if (!initialState?.login && location.pathname !== loginPath) {
        gotoLogin();
        setInitialState({ ...defaultState });
      }
    },
    // rightRender: () => <Link to="/dashboard/list">欢迎</Link>,
    // onMenuHeaderClick: () => {
    //   console.log('onMenuHeaderClick');
    // },
  };
};
