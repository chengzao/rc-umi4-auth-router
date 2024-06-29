import { PageContainer } from '@ant-design/pro-components';
import styles from './index.less';
import { useEffect, useState } from 'react';

const HomePage: React.FC = () => {

  const [list, setList] = useState([]);

  useEffect(() => {
    fetch('/api/v1/list', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(res => res.json())
    .then(res => {
      setList(res.data);
    })
    .catch(err => {
      console.log(err);
    })
  }, [])

  return (
    <PageContainer 
      ghost
      header={{
        title: '列表示例',
      }}
    >
      <div className={styles.container}>
        List

        <ul>
          {
            list.map((item: any) => {
              return <li key={item.id}>{item.name}</li>
            })
          }
        </ul>
      </div>
    </PageContainer>
  );
};

export default HomePage;
