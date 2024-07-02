import { PageContainer } from '@ant-design/pro-components';
import { useEffect } from 'react';
import styles from './index.less';
import Table from './Table';

const HomePage: React.FC = () => {
  useEffect(() => {
    fetch('/api/v1/list', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log('list', res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <PageContainer
      header={{
        title: 'Group列表',
      }}
    >
      <div className={styles.container}>
        <Table />
      </div>
    </PageContainer>
  );
};

export default HomePage;
