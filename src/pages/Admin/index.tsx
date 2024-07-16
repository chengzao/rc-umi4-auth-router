import { ExampleDatePicker2 } from '@/components/DatePickerNow';
import { ExampleDatePicker } from '@/components/DatePickerTailNow';
import { PageContainer } from '@ant-design/pro-components';
import { Access, useAccess } from '@umijs/max';
import { Button } from 'antd';

const AccessPage: React.FC = () => {
  const access = useAccess();
  return (
    <PageContainer
      ghost
      header={{
        title: '权限示例',
      }}
    >
      <Access accessible={access.canSeeAdmin}>
        <Button>只有 Admin 可以看到这个按钮</Button>
      </Access>

      <ExampleDatePicker />

      <ExampleDatePicker2 />
    </PageContainer>
  );
};

export default AccessPage;
