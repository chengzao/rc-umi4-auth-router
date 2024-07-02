import { history, useModel } from '@umijs/max';
import { Outlet } from 'umi';
import './layout.less';

const PrivateLayout = () => {
  const { initialState } = useModel('@@initialState');
  if (!initialState?.login) {
    history.replace('/');
  }

  return (
    <div className="private">
      <Outlet />
    </div>
  );
};

export default PrivateLayout;
