import LoginForm from '@/components/LoginForm';
import { PageContainer } from '@ant-design/pro-components';

import styles from './index.less';

const HomePage: React.FC = () => {
  // const { name } = useModel('global');
  return (
    <PageContainer ghost>
      <div className={styles.container}>
        <LoginForm />
      </div>
    </PageContainer>
  );
};

export default HomePage;
