import { Outlet } from 'umi';

// interface PublicLayoutProps {
//   children: React.ReactNode
// }

const PublicLayout = () => {
  return (
    <div className="public">
      <div>public layout</div>
      <Outlet />
    </div>
  );
};

export default PublicLayout;
