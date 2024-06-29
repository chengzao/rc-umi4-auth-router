import { history, useModel } from '@umijs/max';
import { Outlet } from 'umi';

// interface PrivateLayoutProps {
//   children: React.ReactNode
// }

const PrivateLayout = () => {

  const { initialState } = useModel('@@initialState');
  if(!initialState?.login) {
    history.replace('/');
  }

  return (
    <div className="private">
      <div>private layout</div>
      <Outlet />
    </div>
  );
};

export default PrivateLayout;
