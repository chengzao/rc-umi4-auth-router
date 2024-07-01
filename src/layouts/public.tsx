import { Outlet } from 'umi';

// interface PublicLayoutProps {
//   children: React.ReactNode
// }

const PublicLayout = () => {
  return (
    <div className="public">
      <Outlet />
    </div>
  );
};

export default PublicLayout;
